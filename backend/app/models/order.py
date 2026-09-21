from datetime import datetime, timezone

from ..extensions import db


class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    total = db.Column(db.Numeric(10, 2), nullable=False, default=0)
    created_at = db.Column(
        db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False
    )

    user = db.relationship("User", back_populates="orders")
    items = db.relationship("OrderItem", back_populates="order", lazy=True)
