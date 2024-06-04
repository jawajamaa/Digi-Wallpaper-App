#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, MobileWallpaper, DesktopWallpaper, Comment

def seed_data():

    print("Deleting all previous data...")
    User.query.delete()
    MobileWallpaper.query.delete()
    DesktopWallpaper.query.delete()
    Comment.query.delete()
    
# seed users with faker (maybe 20?)
    print("Creating users....")
    users_list = [User(name=fake.name()) for i in range(20)]
    db.session.add_all(users_list)
    # users_list = []
    # for i in range(20):
    #     u = User(name=fake.first_name().title())
    #     users_list.append(u)

# seed mobile wallpaper (maybe also 20, leaving 3 to add later?)
    print("adding Mobile Wallpapers...")
    mobileW_list =[]

    mobileW1 = MobileWallpaper(
        title = "Lake Havasu",
        location = "Lake Havasu, AZ, USA",
        year = 2001,
        path = "",
        user_id = 1,
    )
    mobileW_list.append(mobileW1)

    db.session.add_all(mobileW_list)

# seed desktop wallpaper (maybe 30, leaving 6 to add later?)


    db.session.commit()
    print("Database seed complete - now it's entirely up to you!")

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed process...")
        seed_data()
