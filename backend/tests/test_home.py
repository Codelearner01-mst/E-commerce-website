from app.extensions import db
from app.models import Category


def test_home_page(client):
    response = client.get("/")
    html_text = response.get_data(as_text=True)

    assert response.status_code == 200
    assert 'id="product-list"' in html_text
    assert 'class="category-grid"' in html_text
    assert 'src="/static/pages%20copy/home.js"' in html_text


def test_home_page_renders_categories_with_safe_product_images(client, app):
    with app.app_context():
        db.session.add_all(
            [
                Category(name="Bracelets", image_url="Bloom_Flower_Studs.png"),
                Category(name="Missing image", image_url="not-found.png"),
                Category(name="Unsafe image", image_url="../hero_image.png"),
            ]
        )
        db.session.commit()

    response = client.get("/")
    html_text = response.get_data(as_text=True)
    fallback = "/static/images/Products/Golden_Elegance_Set.png"

    assert response.status_code == 200
    assert "/static/images/Products/Bloom_Flower_Studs.png" in html_text
    assert 'category=Bracelets' in html_text
    fallback_attributes = html_text.count(f'data-fallback-src="{fallback}"')
    assert fallback_attributes == 3
    assert html_text.count(fallback) - fallback_attributes == 2
    assert "/static/hero_image.png" not in html_text
