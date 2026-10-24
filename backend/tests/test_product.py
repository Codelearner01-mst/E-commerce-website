import pytest

from app import db
from app.models import Category, Product


@pytest.fixture
def product_record(app):
    category = Category(name="Rings", description="Fine rings")
    db.session.add(category)
    db.session.flush()
    product = Product(category.id, "Luna Ring", "A silver ring.", 42.50, "luna.jpg")
    db.session.add(product)
    db.session.commit()
    return product


def test_product_api_returns_product_details(client, product_record):
    response = client.get(f"/api/products/{product_record.id}")

    assert response.status_code == 200
    assert response.get_json()["product"] == {
        "id": product_record.id,
        "name": "Luna Ring",
        "description": "A silver ring.",
        "desc": "A silver ring.",
        "price": 42.5,
        "image": "luna.jpg",
        "category": "Rings",
        "category_id": product_record.category_id,
    }


def test_product_api_returns_404_for_unknown_product(client):
    response = client.get("/api/products/999")

    assert response.status_code == 404
    assert response.get_json() == {"error": "Product not found."}


def test_product_page_includes_product_id_and_script(client, product_record):
    response = client.get(f"/product/{product_record.id}")
    html_text = response.get_data(as_text=True)

    assert response.status_code == 200
    assert f'data-product-id="{product_record.id}"' in html_text
    assert 'id="product-container"' in html_text
    assert 'src="/static/pages%20copy/product.js"' in html_text
