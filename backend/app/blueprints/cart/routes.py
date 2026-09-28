from . import cart_bp
from flask import render_template

@cart_bp.get("/cart")
def get_cart():
   return render_template("carts.html")
