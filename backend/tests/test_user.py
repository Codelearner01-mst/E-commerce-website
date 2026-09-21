from backend.app.models import User

def test_password_hash():
     password = "paul1457"
     user = User(first_name="Paul",last_name="Vision", email="",phone="0543637887",password_hash=password)
     hashed = user.hash_password(password)
     assert hashed != password

def test_same_password_not_same_hash():
     password = "paul1457"
     user1 = User(first_name="Paul",last_name="Vision", email="",phone="0543637887",password_hash=password)
     user2 = User(first_name="Paul",last_name="Kwabena", email="",phone="0543654887",password_hash=password)
     hashed1 = user1.hash_password(password)
     hashed2 = user2.hash_password(password)
     assert hashed1 != hashed2

def test_verify_password():
     password = "paul1457"
     user = User(first_name="Paul",last_name="Vision", email="",phone="0543637887",password_hash=password)
     user.hash_password(password)
     assert user.verify_password(password) == True

def test_verify_password_fail():
     password = "paul1457"
     user = User(first_name="Paul",last_name="Vision", email="",phone="0543637887",password_hash=password)
     user.hash_password(password)
     assert user.verify_password("wrongpassword") == False

def test_signup_page(client):
    response = client.get('/signup')
    assert response.status_code == 200
    assert b'Sign Up' in response.data