from . import orders_bp


@orders_bp.get("/<int:order_id>")
def get_order(order_id):
    return {"id": order_id, "status": "pending"}
