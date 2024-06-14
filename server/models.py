from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# user class with attributes
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    username = db.Column(db.String)
    email = db.Column(db.String)

#   Relationship mapping user to their mobilewallpapers submitted
    mobilepapers = db.relationship(
        'MobileWallpaper', back_populates='users'
        )
    
#   Relationship mapping user to their desktopwallpapers submitted
    desktoppapers = db.relationship(
        'DesktopWallpaper', back_populates='users'
        )
    
    serialize_rules = ('-mobilepapers.users','-desktoppapers.users')
   
    def __repr__(self):
        return f'User {self.id}, {self.name} username: {self.username} email: {self.email}'

class MobileWallpaper(db.Model, SerializerMixin):
    __tablename__ = 'mobilewallpapers'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    location = db.Column(db.String)
    year = db.Column(db.Integer)
    horizontal = db.Column(db.Boolean)
    path = db.Column(db.String)

    user_id  = db.Column(db.Integer, db.ForeignKey('users.id'))
#   Relationship mapping mobile wallpapers to the user who submitted them
    users = db.relationship(
        'User', back_populates='mobilepapers'
        )
    
    serialize_rules = ('-users.mobilepapers',)

    def __repr__(self):
        return f'Mobile Wallpaper {self.id}, Titled: {self.title} taken in {self.location} in {self.year} and the path to the image is: {self.path}'
# 
class DesktopWallpaper(db.Model, SerializerMixin):
    __tablename__ = 'desktopwallpapers'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    location = db.Column(db.String)
    year = db.Column(db.Integer)
    horizontal = db.Column(db.Boolean)
    path = db.Column(db.String)

    user_id  = db.Column(db.Integer, db.ForeignKey('users.id'))
#   Relationship mapping desktopwallpapers to the user who submitted them
    users = db.relationship(
        'User', back_populates='desktoppapers'
        )
    
    serialize_rules = ('-users.desktoppapers',)

    def __repr__(self):
        return f'Desktop Wallpaper {self.id}, Titled: {self.title} taken in {self.location} in {self.year} and the path to the image is: {self.path}'

# association table
# attributes - id, name, rating, comment, mobileWallpapers_id(fk), desktopWallpapers_id(fk), user_id(fk) - FKs not in repr yet - should be?
class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    rating = db.Column(db.Integer)
    comment = db.Column(db.String)

    mobilewallpapers_id = db.Column(db.Integer, db.ForeignKey('mobilewallpapers.id'), nullable=True)
    desktopwallpapers_id = db.Column(db.Integer, db.ForeignKey('desktopwallpapers.id'), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self): f'Comment {self.id} by {self.name} with a rating of {self.rating} out of 5 and the comment {self.comment}'
