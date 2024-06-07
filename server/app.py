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


# Views go here!
class Home(Resource):

    def get(self):
        response_dict = {
            "message": "Mobile and Desktop Wallpaper"
        }

        return make_response(
            response_dict,
            200
        )
    
api.add_resource(Home, '/')

# @app.route('/')
# def home():
#     return '<h1>Mobile and Desktop Wallpaper</h1>'
# have randomly rotating image show up.  Perhaps only rotating through desktop images, but if ever deployed, desktop or mobile depending on device

# 1) Mobile view - /mobilepapers
class MobilePapers(Resource):

    def get(self):
        mp = [mobileP.to_dict() for mobileP in MobileWallpaper.query.all()]

        return make_response( mp, 200 )
    # title, year, location image taken, path or url, username
    def post(self):
        new_paper = MobileWallpaper(
            title=request.form.get("title"),
            year=request.form.get("year"),
            location=request.form.get("location"),
            path=request.form.get("path"),
            username=request.form.get("username"),
        )
    
        db.session.add(new_paper)
        db.session.commit()

        new_paper_dict = new_paper.to_dict()

        return make_response(
            new_paper_dict,
            201
        )
api.add_resource(MobilePapers, '/mobilepapers')

# @app.route('/mobilepapers', methods=['GET'])
# def mobilepapers():
#     if request.method == 'GET':
#         mobilepapers = MobileWallpaper.query.all()

#         return make_response(
#             jsonify([mobileP.to_dict() for mobileP in mobilepapers]), 200
#         )
#     else:
#         return make_response(
#             jsonify({"message": "Method not allowed"}), 405)
    
#   1a) Mobile single wallpaper view RESTful conventions /mobilepapers/1 etc.


# 2) Desktop view - /desktoppapers
class DesktopPapers(Resource):

    def get(self):
        dp = [desktopP.to_dict() for desktopP in DesktopWallpaper.query.all()]

        return make_response( dp, 200 )
    
api.add_resource(DesktopPapers, '/desktoppapers')

# @app.route('/desktoppapers', methods=['GET'])
# def desktoppapers():
#     if request.method == 'GET':
#         desktoppapers = DesktopWallpaper.query.all()

#         return make_response(
#             jsonify([desktopP.to_dict() for desktopP in desktoppapers]), 200
#         )
#     else:
#         return make_response(
#             jsonify({"message": "Method not allowed"}), 405)
    
#   2a) Desktop single wallpaper view RESTful conventions /desktoppapers/1 etc



# 1) Add new wallpaper view - /addwallpapers

if __name__ == '__main__':
    app.run(port=5555, debug=True)
