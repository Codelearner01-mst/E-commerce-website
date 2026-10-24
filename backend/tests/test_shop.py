from app.models import Product
from app.models import Category
import pytest

from app import db

@pytest.fixture
def shop_product(app):
   categories = [Category(name="Lamps"), Category(name="Furniture")]
   db.session.add_all(categories)
   db.session.flush()
   product = Product(categories[0].id, "Lumina Classic", "This is description.", 39.99, "image1.jpg")
   db.session.add(product)
   db.session.commit()
   return product

@pytest.fixture
def test_products_api(client, shop_product):
    res = client.get('/api/products/')
    data = res.get_json()
    assert res.status_code == 200
    product_data = data.get("products")
    assert len(product_data) > 0
    assert "products" in data
    assert shop_product.id in [p["id"] for p in product_data]
    assert shop_product.name in [p["name"] for p in product_data]
    assert "This is description." in [p["desc"] for p in product_data]

def test_shop_page(client, test_products_api):
   res = client.get('/products')
   html_text = res.data.decode('utf-8')
   assert res.status_code == 200
   assert 'id="product-list"' in html_text
   assert 'src="/static/pages%20copy/shop.js"' in html_text

def test_product_to_dict(shop_product):
   product = shop_product
   assert product.product_to_dict() == {
      "id": product.id,
      "name": "Lumina Classic",
      "desc": "This is description.",
      "price": product.price,
      "image": "image1.jpg",
      "category": "Lamps",
   }
