from flask import Blueprint


products_bp = Blueprint("products", __name__)
store_bp = Blueprint("store", __name__)

from . import routes
