from ..extensions import db


class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey("category.id"), nullable=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    image_url = db.Column(db.String(500), nullable=True)
    created_at = db.Column(db.Datetime, nullable=False)
    updated_at = db.Column(db.Datetime, nullable=False)
    
    category = db.relationship("Category", back_populates="products")
