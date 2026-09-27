from . import cart_bp
from flask import render_template

@cart_bp.get("/")
def get_cart():
   return render_template("carts.html")
