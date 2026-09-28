from flask import redirect, render_template, url_for

from . import pages_bp


@pages_bp.get("/")
@pages_bp.get("/index.html")
def index():
    return render_template("index.html")


@pages_bp.get("/about")
def about():
    return render_template("about.html")


@pages_bp.get("/contact")
def contact():
    return render_template("contact.html")


@pages_bp.get("/signup")
def signup():
    return redirect(url_for("auth.sign_up"))
