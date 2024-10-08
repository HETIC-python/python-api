import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from lib.auth import check_password, encrypt_password
from lib.jwt_mod import encode_jwt, decode_jwt
from bleach import clean
from flask_cors import CORS

from sqlalchemy.sql import func

# from jwt import JWT, jwk_from_dict, jwk_from_pem, jws

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(
    basedir, "database.db"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


@app.route("/ping")
def pong():
    return jsonify({"data": "pong"}), 404


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(100), nullable=False)
    lastname = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(100))
    country = db.Column(db.String(100))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    bio = db.Column(db.Text)

    def __repr__(self):
        return f"<Student {self.firstname}>"


@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    print(data)
    user = User(
        firstname=clean(data["firstname"]),
        lastname=clean(data["lastname"]),
        email=clean(data["email"]),
        password=encrypt_password(data["password"]),
    )
    try:
        db.session.add(user)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 403

    saved_user = {
        "id": user.id,
        "firstname": user.firstname,
        "lastname": user.lastname,
        "email": user.email,
        "created_at": user.created_at,
    }
    return jsonify(
        {
            "message": "User created successfully",
            "data": saved_user,
            "token": encode_jwt({"id": user.id, "email": user.email}),
        }
    )


@app.route("/users/<user_id>", methods=["PUT"])
def update(user_id):
    try:
        decoded_token = decode_jwt(request.headers["token"])
    except Exception as e:
        return jsonify({"message": "An error occurred", "error": "invalid token"})

    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"message": "An error occurred", "error": "user not found"})

    if decoded_token["id"] != user.id:
        return jsonify(
            {
                "message": "not authorized",
                "error": "you don't have the necessary permissions",
            }
        )
    data = request.get_json()
    if data.get("firstname"):
        user.firstname = clean(data["firstname"])
    if data.get("firstname"):
        user.lastname = clean(data["lastname"])
    try:
        db.session.commit()
    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)})

    updated_user = {
        "id": user.id,
        "firstname": user.firstname,
        "lastname": user.lastname,
        "email": user.email,
        "created_at": user.created_at,
    }
    return jsonify(
        {
            "message": "User updated successfully",
            "data": updated_user,
            "success" : True
        }
    )


@app.route("/signin", methods=["POST"])
def signin():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()
    if not user:
        return jsonify({"message": "An error occurred", "error": "invalid credentials"}), 404
    if check_password(data["password"], user.password):
        return jsonify(
            {
                "userId": user.id,
                "token": encode_jwt({"id": user.id, "email": user.email}),
            }
        )
    else:
        return jsonify({"message": "An error occurred", "error": "invalid credentials"}), 304


@app.route("/users/<user_id>")
def get_user(user_id):
    # print(request.headers['token'])
    try:
        decoded_token = decode_jwt(request.headers["token"])
    except Exception as e:
        return jsonify({"message": "An error occurred", "error": "invalid token"}), 304
    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"message": "not found", "error": "user not found"}), 404
    if decoded_token["id"] != user.id:
        return jsonify(
            {
                "message": "not authorized",
                "error": "you don't have the necessary permissions",
            }
        ), 403
    user_data = {
        "id": user.id,
        "firstname": user.firstname,
        "lastname": user.lastname,
        "email": user.email,
        "created_at": user.created_at,
    }
    return jsonify({"data": user_data})


@app.route("/users/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    try:
        decoded_token = decode_jwt(request.headers["token"])
    except Exception as e:
        return jsonify({"message": "An error occurred", "error": "invalid token"}), 403
    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"message": "not found", "error": "user not found"}), 404
    if decoded_token["id"] != user.id:
        return jsonify(
            {
                "message": "not authorized",
                "error": "you don't have the necessary permissions",
            }
        ), 403
    db.session.delete(user)
    db.session.commit()
    return jsonify({"success": True, "data": []})


@app.route("/users")
def index():
    users = User.query.all()
    users_json = []
    for user in users:
        user_data = {
            "id": user.id,
            "firstname": user.firstname,
            "lastname": user.lastname,
            "email": user.email,
            "created_at": user.created_at,
        }
        users_json.append(user_data)

    return jsonify({"data": users_json})


if __name__ == "__main__":
    db.create_all()
    app.run(host="localhost", port=5000)
