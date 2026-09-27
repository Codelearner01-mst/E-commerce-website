from decimal import Decimal, InvalidOperation, ROUND_HALF_UP
import re

from ..extensions import db
from ..models import Order, OrderItem, Product


class OrderValidationError(ValueError):
    def __init__(self, message, status_code=400):
        super().__init__(message)
        self.status_code = status_code


PAYMENT_METHODS = {"credit-card", "paypal", "cod"}
MAX_LINE_ITEMS = 50
MAX_QUANTITY = 99
CENT = Decimal("0.01")


def _required_text(data, key, max_length):
    value = data.get(key)
    if not isinstance(value, str) or not value.strip():
        raise OrderValidationError(f"'{key}' is required.")
    value = value.strip()
    if len(value) > max_length:
        raise OrderValidationError(f"'{key}' must be at most {max_length} characters.")
    return value


def _serialize_order(order):
    return {
        "id": order.id,
        "status": order.status,
        "total": str(order.total),
        "payment_method": order.payment_method,
        "created_at": order.created_at.isoformat(),
        "items": [
            {
                "product_id": item.product_id,
                "name": item.product.name,
                "quantity": item.quantity,
                "unit_price": str(item.unit_price),
                "line_total": str(item.unit_price * item.quantity),
            }
            for item in order.items
        ],
    }


def create_order(payload):
    if not isinstance(payload, dict):
        raise OrderValidationError("Request body must be a JSON object.")

    customer = payload.get("customer")
    if not isinstance(customer, dict):
        raise OrderValidationError("'customer' must be an object.")

    first_name = _required_text(customer, "first_name", 155)
    last_name = _required_text(customer, "last_name", 155)
    email = _required_text(customer, "email", 255)
    if not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", email):
        raise OrderValidationError("'email' must be a valid email address.")
    phone = _required_text(customer, "phone", 30)
    country = _required_text(customer, "country", 100)
    address = _required_text(customer, "address", 255)
    city = _required_text(customer, "city", 120)
    message = customer.get("message", "")
    if not isinstance(message, str) or len(message) > 2000:
        raise OrderValidationError("'message' must be text no longer than 2000 characters.")

    payment_method = payload.get("payment_method")
    if not isinstance(payment_method, str) or payment_method not in PAYMENT_METHODS:
        raise OrderValidationError("'payment_method' must be credit-card, paypal, or cod.")

    lines = payload.get("items")
    if not isinstance(lines, list) or not lines:
        raise OrderValidationError("'items' must be a non-empty list.")
    if len(lines) > MAX_LINE_ITEMS:
        raise OrderValidationError(f"A booking can contain at most {MAX_LINE_ITEMS} line items.")

    quantities = {}
    for line in lines:
        if not isinstance(line, dict):
            raise OrderValidationError("Each item must be an object.")
        product_id = line.get("product_id")
        quantity = line.get("quantity")
        if isinstance(product_id, bool) or not isinstance(product_id, int) or product_id < 1:
            raise OrderValidationError("Each item must have a positive integer product_id.")
        if isinstance(quantity, bool) or not isinstance(quantity, int) or quantity < 1:
            raise OrderValidationError("Each item must have a positive integer quantity.")
        quantities[product_id] = quantities.get(product_id, 0) + quantity
        if quantities[product_id] > MAX_QUANTITY:
            raise OrderValidationError(f"Quantity for product {product_id} cannot exceed {MAX_QUANTITY}.")

    products = db.session.execute(
        db.select(Product).where(Product.id.in_(quantities))
    ).scalars().all()
    products_by_id = {product.id: product for product in products}
    missing_ids = sorted(set(quantities) - set(products_by_id))
    if missing_ids:
        raise OrderValidationError(
            "One or more products are unavailable.", status_code=404
        )

    total = Decimal("0.00")
    order_items = []
    for product_id, quantity in quantities.items():
        product = products_by_id[product_id]
        try:
            price = Decimal(str(product.price)).quantize(CENT, rounding=ROUND_HALF_UP)
        except (InvalidOperation, TypeError):
            raise OrderValidationError(f"Product {product_id} has an invalid price.", 409)
        if not price.is_finite() or price < 0:
            raise OrderValidationError(f"Product {product_id} has an invalid price.", 409)
        total += price * quantity
        order_items.append(OrderItem(product=product, quantity=quantity, unit_price=price))

    total = total.quantize(CENT, rounding=ROUND_HALF_UP)
    if total > Decimal("99999999.99"):
        raise OrderValidationError("Order total exceeds the supported amount.")

    order = Order(
        total=total,
        status="pending",
        first_name=first_name,
        last_name=last_name,
        email=email,
        phone=phone,
        country=country,
        address=address,
        city=city,
        message=message.strip() or None,
        payment_method=payment_method,
        items=order_items,
    )
    try:
        db.session.add(order)
        db.session.commit()
    except Exception:
        db.session.rollback()
        raise
    return order


def order_to_dict(order):
    return _serialize_order(order)
