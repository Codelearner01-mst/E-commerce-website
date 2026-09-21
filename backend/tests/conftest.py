import pytest

from backend.app import create_app
from backend.app import db


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
    return app.test_client()
