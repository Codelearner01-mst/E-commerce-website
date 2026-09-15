from . import cart_bp


@cart_bp.get("/<int:user_id>")
def get_cart(user_id):
    return {"user_id": user_id, "items": []}
