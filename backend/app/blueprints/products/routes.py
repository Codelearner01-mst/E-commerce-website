from flask import jsonify, render_template

from . import products_bp, store_bp
from ...models import Category, Product
from ...extensions import db


@products_bp.get("/", strict_slashes=False)
@products_bp.get("/data")
def list_products():
    stmt = db.select(Product).order_by(Product.id)
    products = db.session.execute(stmt).scalars().all()
    products_data = [product.product_to_api_dict() for product in products]
    return jsonify({"products": products_data, "productData": products_data})


@products_bp.get("/categories")
def list_categories():
    categories = db.session.execute(
        db.select(Category).order_by(Category.name)
    ).scalars().all()
    return jsonify({"categories": [category.category_to_dict() for category in categories]})


@products_bp.get("/<int:product_id>")
def get_product(product_id):
    product = db.session.get(Product, product_id)
    if product is None:
        return jsonify({"error": "Product not found."}), 404
    return jsonify({"product": product.product_to_api_dict()})


@store_bp.get("/shop")
@store_bp.get("/products")
def shop():
    return render_template("shop.html")


@store_bp.get("/product/<int:product_id>")
def product_page(product_id):
    return render_template("product.html", product_id=product_id)
