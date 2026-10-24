import pytest

from app import db
from app.models import Category


@pytest.fixture
def categories(app):
    records = [Category(name="Watches"), Category(name="Bracelets")]
    db.session.add_all(records)
    db.session.commit()
    return records


def test_categories_api_returns_categories_in_name_order(client, categories):
    response = client.get("/api/products/categories")

    assert response.status_code == 200
    assert response.get_json() == {
        "categories": [
            {
                "id": next(category.id for category in categories if category.name == "Bracelets"),
                "name": "Bracelets",
                "description": None,
                    "image_url": None,
            },
            {
                "id": next(category.id for category in categories if category.name == "Watches"),
                "name": "Watches",
                "description": None,
                    "image_url": None,
            },
        ]
    }


def test_categories_api_returns_empty_list_when_no_categories(client):
    response = client.get("/api/products/categories")

    assert response.status_code == 200
    assert response.get_json() == {"categories": []}
