from flask import render_template

from . import checkout_bp


@checkout_bp.get("/checkout")
def checkout_page():
    return render_template("checkout.html")
