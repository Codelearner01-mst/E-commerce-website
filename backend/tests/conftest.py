import pytest

from app import create_app
from app import db


@pytest.fixture
def app():
    app = create_app("testing")
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()
        print("db is closed")


@pytest.fixture
def client(app):
    with app.test_client() as client:
        yield client
