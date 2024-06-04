#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, MobileWallpaper, DesktopWallpaper, Comment

fake = Faker()

def seed_data():
    x = 20

    print("Deleting all previous data...")
    User.query.delete()
    MobileWallpaper.query.delete()
    DesktopWallpaper.query.delete()
    Comment.query.delete()
    
# seed users with faker (maybe 20?)
    print("Creating users....")
    users_list = [User(name=fake.name()) for i in range(x)]
    db.session.add_all(users_list)
    # users_list = []
    # for i in range(20):
    #     u = User(name=fake.first_name().title())
    #     users_list.append(u)

# seed mobile wallpaper (maybe also 20, leaving 3 to add later?)
    print("adding Mobile Wallpapers...")
    mobileW_list =[]

    mobileW1 = MobileWallpaper(
        title = "SLO",
        location = "San Luis Obispo, CA, USA",
        year = 2012,
        path = "/images/v3000pxLongEdge/120428_SLO_076.jpg",
        user_id = randint(1, x),
    )
    mobileW_list.append(mobileW1)

    mobileW2 = MobileWallpaper(
        title = "Dune du Pilat 682",
        location = "Dune du Pilat, France",
        year = 2013,
        path = "/images/v3000pxLongEdge/20140920_Dune_du_Pilat_682.jpg",
        user_id = randint(1, x),
    )
    mobileW_list.append(mobileW2)

    mobileW3 = MobileWallpaper(
        title = "Elephant",
        location = "Cochin, Carola, India",
        year = 2010,
        path = "/images/v3000pxLongEdge/Cochin_Elephant_104.jpg",
        user_id = randint(1, x),
    )
    mobileW_list.append(mobileW3)

    mobileW4 = MobileWallpaper(
        title = "Lake Havasu",
        location = "Lake Havasu, AZ, USA",
        year = 2001,
        path = "/images/v3000pxLongEdge/LakeHavasu1.5.jpg",
        user_id = randint(1, x),
    )
    mobileW_list.append(mobileW4)

    mobileW5 = MobileWallpaper(
        title = "Windmills 40",
        location = "Cathedral Valley, CA, USA",
        year = 2009,
        path = "/images/v3000pxLongEdge/windmills_040.jpg",
        user_id = randint(1, x),
    )
    mobileW_list.append(mobileW5)

    mobileW6 = MobileWallpaper(
        title = "Wall 209",
        location = "Paris, France",
        year = 2011,
        path = "/images/v3000pxLongEdge/Paris_209.jpg",
        user_id = randint(1, x),
    )
    mobileW_list.append(mobileW6)

    mobileW7 = MobileWallpaper(
        title = "Dam 10",
        location = "Boise, ID, USA",
        year = 2009,
        path = "/images/v3000pxLongEdge/Boise_010.jpg",
        user_id = randint(1, x),
    )
    mobileW_list.append(mobileW7)



    db.session.add_all(mobileW_list)

# seed desktop wallpaper (maybe 30, leaving 6 to add later?)


    db.session.commit()
    print("Database seed complete - now it's entirely up to you!")

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed process...")
        seed_data()
