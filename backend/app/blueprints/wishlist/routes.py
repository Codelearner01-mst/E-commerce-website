from . import wishlist_bp
from flask import render_template


@wishlist_bp.get("/")
def get_wishlist():
    return render_template("wishlist.html")
