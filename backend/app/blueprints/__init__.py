from flask import Blueprint, redirect, render_template, url_for

from ..extensions import db
from ..models import Category


pages_bp = Blueprint("pages", __name__)


@pages_bp.get("/")
@pages_bp.get("/index.html")
def index():
    return render_template("index.html")


@pages_bp.get("/shop")
@pages_bp.get("/products")
def shop():
    categories = db.session.execute(db.select(Category)).scalars().all()
    return render_template("shop.html", categories=categories)


@pages_bp.get("/about")
def about():
    return render_template("about.html")


@pages_bp.get("/contact")
def contact():
    return render_template("contact.html")


@pages_bp.get("/cart")
def cart():
    return render_template("carts.html")


@pages_bp.get("/wishlist")
def wishlist():
    return render_template("wishlist.html")


@pages_bp.get("/checkout")
def checkout():
    return render_template("checkout.html")


@pages_bp.get("/product")
def product():
    return render_template("product.html")


@pages_bp.get("/signup")
def signup():
    return redirect(url_for("auth.sign_up"))
