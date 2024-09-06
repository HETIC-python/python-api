import jwt
import os
SECRET = os.environ.get('JWT_SECRET') or "secret"

def encode_jwt(payload):
    return jwt.encode(payload, SECRET, algorithm='HS256')

def decode_jwt(token):
    return jwt.decode(token, SECRET, algorithms=['HS256'])