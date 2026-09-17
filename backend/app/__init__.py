from flask import Flask
from flask_cors import CORS

from config import configs
from .extensions import db, migrate
from . import models
from .blueprints.auth import auth_bp
from .blueprints.products import products_bp
from .blueprints.cart import cart_bp
from .blueprints.wishlist import wishlist_bp
from .blueprints.orders import orders_bp


def create_app(config_name="development"):
    app = Flask(__name__)
    app.config.from_object(configs.get(config_name))

    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(products_bp, url_prefix="/api/products")
    app.register_blueprint(cart_bp, url_prefix="/api/cart")
    app.register_blueprint(wishlist_bp, url_prefix="/api/wishlist")
    app.register_blueprint(orders_bp, url_prefix="/api/orders")

    @app.get("/api/health")
    def health_check():
        return {"status": "ok"}

    return app
