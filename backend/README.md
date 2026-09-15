# Vision Jewelry Backend

Flask API for the Vision Jewelry storefront.

## Setup

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
$env:FLASK_APP = "run.py"
flask run
```

## Test

```powershell
pytest
```

## Migrations

```powershell
flask db init
flask db migrate -m "initial schema"
flask db upgrade
```
