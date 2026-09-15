from ..models import Product


def get_all_products():
    return Product.query.all()
