from flask import jsonify, request

from ...extensions import db
from ...models import Order
from ...services.order_service import OrderValidationError, create_order, order_to_dict
from . import orders_bp


@orders_bp.post("/", strict_slashes=False)
def place_order():
    try:
        order = create_order(request.get_json(silent=True))
    except OrderValidationError as error:
        return jsonify({"error": str(error)}), error.status_code
    return jsonify({"order": order_to_dict(order)}), 201


@orders_bp.get("/<int:order_id>")
def get_order(order_id):
    order = db.session.get(Order, order_id)
    if order is None:
        return jsonify({"error": "Order not found."}), 404
    return jsonify({"order": order_to_dict(order)})
