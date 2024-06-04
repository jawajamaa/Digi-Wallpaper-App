from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# user class with attributes
class User():
    pass


class MobileWallpaper():
    pass

# 
class DesktopWallpaper():
    pass

# association table
# attributes - id, name, rating, comment, mobileWallpapers_id(fk), desktopWallpapers_id(fk), user_id(fk)
class Comments():
    pass
