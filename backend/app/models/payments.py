from ..extensions import db


class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("order.id"), nullable=False)
    status = db.Column(db.String(40), default="Pending", nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False, default=0)
    payment_method = db.Column(db.String(40), default="POD", nullable=False)
    transaction_ref = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.Datetime, nullable=False)

    order = db.relationship("Order", back_populates="payment")
  