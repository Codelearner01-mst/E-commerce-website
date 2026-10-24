from pathlib import Path

from flask import current_app, redirect, render_template, url_for

from ...extensions import db
from ...models import Category
from . import pages_bp


FALLBACK_CATEGORY_IMAGE = "images/Products/Golden_Elegance_Set.png"
CATEGORY_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}


def _category_image_path(filename):
    if not isinstance(filename, str) or not filename:
        return FALLBACK_CATEGORY_IMAGE
    if "/" in filename or "\\" in filename or Path(filename).name != filename:
        return FALLBACK_CATEGORY_IMAGE
    if Path(filename).suffix.lower() not in CATEGORY_IMAGE_EXTENSIONS:
        return FALLBACK_CATEGORY_IMAGE

    image_directory = Path(current_app.static_folder) / "images" / "Products"
    candidate = image_directory / filename
    try:
        resolved_directory = image_directory.resolve(strict=True)
        resolved_candidate = candidate.resolve(strict=True)
        if resolved_candidate.parent != resolved_directory or not resolved_candidate.is_file():
            return FALLBACK_CATEGORY_IMAGE
    except (OSError, RuntimeError):
        return FALLBACK_CATEGORY_IMAGE

    return f"images/Products/{filename}"


@pages_bp.get("/")
@pages_bp.get("/index.html")
def index():
    records = db.session.execute(
        db.select(Category).order_by(Category.name)
    ).scalars().all()
    categories = [
        {"name": category.name, "image_path": _category_image_path(category.image_url)}
        for category in records
    ]
    return render_template("index.html", categories=categories)


@pages_bp.get("/about")
def about():
    return render_template("about.html")


@pages_bp.get("/contact")
def contact():
    return render_template("contact.html")


@pages_bp.get("/signup")
def signup():
    return redirect(url_for("auth.sign_up"))
