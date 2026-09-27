from . import auth_bp
from flask import render_template,jsonify, flash,url_for,redirect
from .forms import SignupForm
from ...extensions import db  
from ...models import User


@auth_bp.route("/", methods=["GET", "POST"], strict_slashes=False)
def sign_up():
    form = SignupForm()
    if form.validate_on_submit():
        user_exist = db.session.execute(db.select(User).where(User.phone==form.phone.data)).scalars().one_or_none()
        if user_exist:
            flash("Phone number already in used")
            return redirect(url_for('auth.sign_up'))
        user = User(first_name = form.first_name.data,last_name=form.last_name.data,phone=form.phone.data,password_hash=form.password.data)
        user.hash_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash("Account created sucessfuly!")   
        return redirect(url_for("pages.index"))
    return render_template("signup.html", form=form)
    
 
