from ..extensions import db


class Category(db.Model):
    __tablename__ = 'categories'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)
    image_url = db.Column(db.String(255), nullable=True)

    products = db.relationship("Product", back_populates="category")

    def category_to_dict(self):
        return {"id": self.id, "name": self.name, "description": self.description, "image_url": self.image_url}
