#!/usr/bin/env python3

# Standard library imports
# Remote library imports
from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import User, MobileWallpaper, DesktopWallpaper

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.json.compact = False

# CORS(app)
# migrate = Migrate(app,db)

# db.init_app(app)

# Views go here!

@app.route('/')
def home():
    return '<h1>Mobile and Desktop Wallpaper</h1>'
# have randomly rotating image show up.  Perhaps only rotating through desktop images, but if ever deployed, desktop or mobile depending on device

# 1) Mobile view - /mobilepapers
@app.route('/mobilepapers', methods=['GET'])
def mobilepapers():
    if request.method == 'GET':
        mobilepapers = MobileWallpaper.query.all()

        print("line 36 app.py", mobilepapers)

        return make_response(
            jsonify([mobileP.to_dict() for mobileP in mobilepapers], 200 )
        )
    else:
        return make_response(
            jsonify({"message": "Method not allowed"}), 405)
#   1a) Mobile single wallpaper view RESTful conventions /mobilepapers/1 etc.
# 2) Desktop view - /desktoppapers
#   2a) Desktop single wallpaper view RESTful conventions /desktoppapers/1 etc
# 1) Add new wallpaper view - /addwallpapers

if __name__ == '__main__':
    app.run(port=5555, debug=True)
