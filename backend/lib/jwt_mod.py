import jwt

def encode_jwt(payload, secret="secret"):
    return jwt.encode(payload, secret, algorithm='HS256')

def decode_jwt(token, secret="secret"):
    return jwt.decode(token, secret, algorithms=['HS256'])