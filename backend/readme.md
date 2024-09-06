# TELECHARGER LES package

- `python3 -m venv .venv`
- `source .vent/bin/activate`
- `python3 -m pip install -r requirements.txt`

## SETUP LA BDD

- `cd backend`
- `flask shell`
- `from app import db`
- `db.create_all()`

## launch project

- `export FLASK_APP=app`
- `flask --app app run --reload`
