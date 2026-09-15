def create_order(user_id, items):
    """Create an order after validation and payment integration are added."""
    return {"user_id": user_id, "items": items, "status": "pending"}
