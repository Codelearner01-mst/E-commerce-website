from . import products_bp


@products_bp.get("/")
def list_products():
    return {"items": []}


@products_bp.get("/<int:product_id>")
def get_product(product_id):
    return {"id": product_id}
