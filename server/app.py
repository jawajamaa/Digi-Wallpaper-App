#!/usr/bin/env python3

from flask import Flask, jsonify, make_response, request
from flask_migrate import Migrate
from flask_restful import Resource


from config import app, db, api

from models import User, MobileWallpaper, DesktopWallpaper, Comment


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


# 1) Mobile view - /mobilepapers
class MobilePapers(Resource):

    def get(self):
        mp = [mobileP.to_dict() for mobileP in MobileWallpaper.query.all()]
        response = make_response( mp, 200 )
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response
    

    def post(self):

        lookUpUser = request.get_json().get("username")
        user = User.query.filter_by(username=lookUpUser).first()
        new_paper = MobileWallpaper(
            title=request.get_json().get("title"),
            year=request.get_json().get("year"),
            location=request.get_json().get("location"),
            path=request.get_json().get("url"),
            user_id = user.id
        )
        
        db.session.add(new_paper)
        db.session.commit()

        new_paper_dict = new_paper.to_dict()

        return make_response(
            new_paper_dict,
            201
        )
api.add_resource(MobilePapers, '/mobilepapers')

class MobilePapersById(Resource):

    def get(self, id):
        mp = MobileWallpaper.query.filter_by(id=id).first()
        return make_response( mp, 200 ) 

    def delete(self, id):
        mp = MobileWallpaper.query.filter_by(id=id).first()

        db.session.delete(mp)
        db.session.commit()

        return make_response({
            "Message": "Selected Mobile Wallpaper deleted successfully"
        }, 202)

api.add_resource(MobilePapersById, '/mobilepapers/<int:id>')

# 2) Desktop view - /desktoppapers
class DesktopPapers(Resource):

    def get(self):
        dp = [desktopP.to_dict() for desktopP in DesktopWallpaper.query.all()]
        response = make_response( dp, 200 )
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response
    
    def post(self):
        lookUpUser = request.get_json().get("username")
        user = User.query.filter_by(username=lookUpUser).first()
        new_paper = DesktopWallpaper(
            title=request.get_json().get("title"),
            year=request.get_json().get("year"),
            location=request.get_json().get("location"),
            path=request.get_json().get("url"),
            horizontal=request.get_json().get("horizontal"),
            user_id = user.id
        )
        
        db.session.add(new_paper)
        db.session.commit()

        new_paper_dict = new_paper.to_dict()

        return make_response(
            new_paper_dict,
            201
        )
api.add_resource(DesktopPapers, '/desktoppapers')
    
#   2a) Desktop single wallpaper view RESTful conventions /desktoppapers/1 etc

# 3) User view - /users
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
    
    def get(self, id):
        response_dict = User.query.filter_by(id=id).first().to_dict()
        return make_response( response_dict, 200 )
    
    def patch(self, id):
        user = User.query.filter_by(id=id).first()

        for attr in request.get_json():
            setattr(user, attr, request.get_json()[attr])

        db.session.add(user)
        db.session.commit()

        user_dict = user.to_dict()
        return make_response( user_dict, 202 ) 
    
    def delete(self, id):
        user_record = User.query.filter_by(id=id).first()

        db.session.delete(user_record)
        db.session.commit()

        response = make_response({
            "Message": "User successfully deleted!"
        }, 202 )
        return response

api.add_resource(UsersbyId, "/users/<int:id>")

class Comments(Resource):

    def get(self):
        com = [c.to_dict() for c in Comment.query.all()]
        return make_response( com, 200 )
    
    def post(self):
        lookUpUser = request.get_json().get("username")
        user = User.query.filter_by(username=lookUpUser).first()

        new_comment = Comment(
            name=request.get_json().get("name"),
            rating=request.get_json().get("rating"),
            comment=request.get_json().get("comment"),
            mobilewallpapers_id=request.get_json().get("mobilewallpapers_id"),
            desktopwallpapers_id=request.get_json().get("desktopwallpapers_id"),
            user_id=user.id
        )

        db.session.add(new_comment)
        db.session.commit()

        return make_response( new_comment.to_dict(), 201 )

api.add_resource(Comments, '/comments' )

if __name__ == '__main__':
    app.run(port=5555, debug=True)
