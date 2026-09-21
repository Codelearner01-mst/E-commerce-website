from datetime import datetime, timezone
import hashlib
from werkzeug.security import generate_password_hash, check_password_hash
from ..extensions import db,login_manager


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(155),nullable=False)
    last_name = db.Column(db.String(155),nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=True, index=True)
    phone = db.Column(db.String(15),nullable=False)
    password_hash = db.Column(db.String(255),nullable=False)
    created_at = db.Column(
        db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False
    )
    confirmed =  db.Column(db.Boolean,default=False, nullable=False)
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc),nullable=True)
    
    orders = db.relationship("Order", back_populates="user", lazy=True)

    def hash_password(self, password):
       self.password_hash = generate_password_hash(password)
       return self.password_hash

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)
    
# 1. A temporary dummy class so Flask-Login has a User object structure
from flask_login import UserMixin

class DummyUser(UserMixin):
    pass

# 2. The temporary placeholder loader
@login_manager.user_loader
def load_user(user_id):
    # This keeps Flask-Login happy for now without a database
    return DummyUser()