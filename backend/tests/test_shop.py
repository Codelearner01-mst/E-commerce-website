from app.models import Product
from app.models import Category

from app import db

def test_shop_page(client):
   res = client.get('/api/products')
   assert res.status_code == 200

def test_product_to_dict(app):
   categories = [Category(name="Lamps"), Category(name="Furniture")]
   db.session.add_all(categories)
   db.session.flush()
   product = Product(categories[0].id, "Lumina Classic", "This is description.", 39.99, "image1.jpg")
   db.session.add(product)
   db.session.commit()

   assert product.product_to_dict() == {
      "id": product.id,
      "name": "Lumina Classic",
      "desc": "This is description.",
      "price": product.price,
      "image": "image1.jpg",
      "category": "Lamps",
   }
