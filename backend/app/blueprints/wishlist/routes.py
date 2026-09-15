from . import wishlist_bp


@wishlist_bp.get("/<int:user_id>")
def get_wishlist(user_id):
    return {"user_id": user_id, "items": []}
