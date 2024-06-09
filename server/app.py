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
    # HERE is where I would query the db with the username to find the user_id?
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

# 3) Add new user view - /users
class Users(Resource):

    def get(self):
        u = [p.to_dict() for p in User.query.all()]

        return make_response( u, 200 )
    
    def post(self):
        new_user = User(
            name=request.get_json().get("name"),
            username=request.get_json().get("username"),
            email=request.get_json().get("email"),
        )

        db.session.add(new_user)
        db.session.commit()

        new_user_dict = new_user.to_dict()

        return make_response(
            new_user_dict,
            201
        )
api.add_resource(Users, '/users' )

class UsersbyUsername(Resource):

    def get(self, username):
        response_dict = User.query.filter_by(username=username).first.to_dict()
        return make_response( response_dict, 200 )
    
    def delete(self, username):
        user_record = User.query.filter_by(username=username).first()

        db.session.delete(user_record)
        db.session.commit()

        return make_response({
            "Message": "User successfully deleted!"
        }, 202 )

api.add_resource(UsersbyUsername)
# no route as the user is not necessary to display for privacy

class UsersbyId(Resource):
    
    def get(self):
        response_dict = User.query.filter_by(id=id).first.to_dict()
        return make_response( response_dict, 200 )
    
    def delete(self):
        user_record = User.query.filter_by(id=id).first()

        db.session.delete(user_record)
        db.session.commit()

        return make_response({
            "Message": "User successfully deleted!"
        }, 202 )

api.add_resource(UsersbyId)
# no route as the user is not necessary to display for privacy

if __name__ == '__main__':
    app.run(port=5555, debug=True)
