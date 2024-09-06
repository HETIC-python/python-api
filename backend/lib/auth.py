import bcrypt
salt = bcrypt.gensalt()
def encrypt_password(password):
    encoded = password.encode()
    hashed = bcrypt.hashpw(
                password=encoded,
                salt=salt
            )
    return hashed


def check_password(user_password, hash_password):
    encoded = user_password.encode()
    return bcrypt.checkpw(encoded, hash_password)
