from ..extensions import db

class Inventory(db.Model):
    __tablename__ = 'inventories'
    
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"), nullable=True)
    stock_quantity = db.Column(db.Integer, nullable=False)
    low_stock_threshold = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(40), default="In stock", nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    product = db.relationship("Product", back_populates="inventory")