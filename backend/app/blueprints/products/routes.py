from . import products_bp
from flask import render_template,url_for,jsonify
from ...models import Category,Product
from ...extensions import db


@products_bp.get("/data")
def list_products():
    stmt = (db.select(Product))
    products = db.session.execute(stmt).scalars().all()
    products_data = [p.product_to_dict() for p in products]
    return jsonify({"productData":products_data})


@products_bp.get("/<int:product_id>")
def get_product(product_id):
    return {"id": product_id}

@products_bp.get("/", strict_slashes=False)
def categories():
     cats = Category.query.all()
     print("Categories",cats)
     return render_template("shop.html", categories=cats)
