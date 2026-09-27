from decimal import Decimal

import pytest

from app import db
from app.models import Order, OrderItem, Product


@pytest.fixture
def order_product(app):
    product = Product(None, "Gold pendant", "Hand-finished pendant", Decimal("125.50"), "pendant.jpg")
    db.session.add(product)
    db.session.commit()
    return product


def valid_order_payload(product_id, **overrides):
    payload = {
        "customer": {
            "first_name": "Ama",
            "last_name": "Mensah",
            "email": "ama@example.com",
            "phone": "+233201234567",
            "country": "Ghana",
            "address": "12 Market Street",
            "city": "Accra",
            "message": "Please call before delivery.",
        },
        "payment_method": "cod",
        "items": [{"product_id": product_id, "quantity": 2}],
    }
    payload.update(overrides)
    return payload


def test_create_order_persists_customer_items_and_server_price(client, app, order_product):
    payload = valid_order_payload(order_product.id)
    payload["items"][0]["price"] = "0.01"  # Never trust prices supplied by the browser.

    response = client.post("/api/orders/", json=payload)

    assert response.status_code == 201
    result = response.get_json()["order"]
    with app.app_context():
        order = db.session.get(Order, result["id"])
        item = db.session.query(OrderItem).filter_by(order_id=order.id).one()
        assert order.email == "ama@example.com"
        assert order.address == "12 Market Street"
        assert order.payment_method == "cod"
        assert order.status == "pending"
        assert order.total == Decimal("251.00")
        assert item.quantity == 2
        assert item.unit_price == Decimal("125.50")
    assert result["total"] == "251.00"


def test_duplicate_product_lines_are_combined(client, order_product):
    payload = valid_order_payload(order_product.id)
    payload["items"] = [
        {"product_id": order_product.id, "quantity": 1},
        {"product_id": order_product.id, "quantity": 2},
    ]

    response = client.post("/api/orders/", json=payload)

    assert response.status_code == 201
    assert len(response.get_json()["order"]["items"]) == 1
    assert response.get_json()["order"]["items"][0]["quantity"] == 3
    assert response.get_json()["order"]["total"] == "376.50"


@pytest.mark.parametrize(
    ("change", "expected_status"),
    [
        (lambda data: data.update(items=[]), 400),
        (lambda data: data["items"][0].update(quantity=0), 400),
        (lambda data: data["items"][0].update(quantity=True), 400),
        (lambda data: data["items"][0].update(product_id=999999), 404),
        (lambda data: data.update(payment_method=[]), 400),
        (lambda data: data["customer"].update(email="not-an-email"), 400),
        (lambda data: data["customer"].update(address=" "), 400),
        (lambda data: data["items"][0].update(quantity=100), 400),
    ],
)
def test_rejects_invalid_booking_without_creating_order(
    client, app, order_product, change, expected_status
):
    payload = valid_order_payload(order_product.id)
    change(payload)

    response = client.post("/api/orders/", json=payload)

    assert response.status_code == expected_status
    assert "error" in response.get_json()
    with app.app_context():
        assert db.session.query(Order).count() == 0


def test_order_lookup_returns_404_for_unknown_id(client):
    response = client.get("/api/orders/987654")

    assert response.status_code == 404
    assert response.get_json() == {"error": "Order not found."}
