from flask_wtf import FlaskForm, CSRFProtect
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, EqualTo, Length

class SignupForm(FlaskForm):
    first_name = StringField("First Name", validators=[DataRequired(), Length(min=2, max=30, message="First name must be between 2 and 30 characters")])
    last_name = StringField("Last Name", validators=[DataRequired(), Length(min=2, max=30, message="Last name must be between 2 and 30 characters")])
    phone = StringField("Phone Number", validators=[DataRequired(), Length(min=10, max=10, message="Phone number must be exactly 10 digits")])
    password = PasswordField("Password", validators=[DataRequired(), Length(min=6, max=120, message="Password must be between 6 and 120 characters")])
    confirm_password = PasswordField("Confirm Password", validators=[DataRequired(), EqualTo("password", message="Passwords must match")])
    submit = SubmitField("Sign Up")