from ..extensions import db


class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    image_url = db.Column(db.String(500), nullable=True)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)
    
    category = db.relationship("Category", back_populates="products")

    def __init__(self,category_id, name,description,price,image_url):
      self.category_id = category_id
      self.name = name
      self.description = description
      self.price = price
      self.image_url = image_url

    def product_to_dict(self):
        return {
           'id':self.id,
           'name':self.name,
           'desc':self.description,
           'price':self.price,
           'image':self.image_url,
           'category': self.category.name
        }
