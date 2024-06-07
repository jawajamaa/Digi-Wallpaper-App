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
        location = "Palm Springs, CA, USA",
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

    mobileW8 = MobileWallpaper(
        title = "Brooklyn Navy Yard 070",
        location = "Brooklyn, NY, USA",
        year = 2008,
        path = "/images/v3000pxLongEdge/brooklyn_naval_yard070.jpg",
        user_id = randint(1, x),
    )
    mobileW_list.append(mobileW8)

    mobileW9 = MobileWallpaper(
        title = "Joshua Tree 092",
        location = "Joshua Tree NP, CA, USA",
        year = 2009,
        path = "/images/v3000pxLongEdge/joshua_tree_092.jpg",
        user_id = randint(1, x),
    )
    mobileW_list.append(mobileW9)

    mobileW10 = MobileWallpaper(
        title = "Menara KL Tower 081",
        location = "Kuala Lumpur, Malaysia",
        year = 2008,
        path = "/images/v3000pxLongEdge/kuala_lumpur_081.jpg",
        user_id = randint(1, x),
    )
    mobileW_list.append(mobileW10)

    mobileW11 = MobileWallpaper(
        title = "Menara KL Tower 137",
        location = "Kuala Lumpur, Malaysia",
        year = 2008,
        path = "/images/v3000pxLongEdge/kuala_lumpur_137.jpg",
        user_id = randint(1, x),
    )
    mobileW_list.append(mobileW11)

    mobileW12 = MobileWallpaper(
        title = "Vending",
        location = "Rochester, NY, USA",
        year = 2006,
        path = "/images/v3000pxLongEdge/vending1_2.jpg",
        user_id = randint(1, x),
    )
    mobileW_list.append(mobileW12)

    mobileW13 = MobileWallpaper(
        title = "Westminster Arches 1.1",
        location = "Westminster, London, UK",
        year = 2008,
        path = "/images/v3000pxLongEdge/westminster_arches1-1.jpg",
        user_id = randint(1, x),
    )
    mobileW_list.append(mobileW13)

    mobileW14 = MobileWallpaper(
        title = "Golden Circle 296",
        location = "Iceland",
        year = 2014,
        path = "/images/v3000pxLongEdge/Golden_Circle_296.jpg",
        user_id = randint(1, x),
    )
    mobileW_list.append(mobileW14)

    mobileW15 = MobileWallpaper(
        title = "White Chair 1c",
        location = "Westminster, London, UK",
        year = 2008,
        path = "/images/v3000pxLongEdge/white_chair1c.jpg",
        user_id = randint(1, x),
    )
    mobileW_list.append(mobileW15)

    mobileW16 = MobileWallpaper(
        title = "Macau 080",
        location = "Macau, SAR of PRC",
        year = 2008,
        path = "/images/v3000pxLongEdge/macau_080.jpg",
        user_id = randint(1, x),
    )
    mobileW_list.append(mobileW16)

    mobileW17 = MobileWallpaper(
        title = "Kuala Lumpur 101",
        location = "Kuala Lumpur, Malaysia",
        year = 2008,
        path = "/images/v3000pxLongEdge/kuala_lumpur_101_crop_symtcl.jpg",
        user_id = randint(1, x),
    )
    mobileW_list.append(mobileW17)

    mobileW18 = MobileWallpaper(
        title = "Golden Circle 210",
        location = "Iceland",
        year = 2014,
        path = "/images/v3000pxLongEdge/Golden_Circle_210.jpg",
        user_id = randint(1, x),
    )
    mobileW_list.append(mobileW18)

    mobileW19 = MobileWallpaper(
        title = "Agra 141",
        location = "Agra, Uttar Pradesh, India",
        year = 2010,
        path = "/images/v3000pxLongEdge/Agra_141.jpg",
        user_id = randint(1, x),
    )
    mobileW_list.append(mobileW19)

    mobileW20 = MobileWallpaper(
        title = "Petronas Towers",
        location = "Kuala Lumpur, Malaysia",
        year = 2008,
        path = "/images/v3000pxLongEdge/kuala_lumpur_075.jpg",
        user_id = randint(1, x),
    )
    mobileW_list.append(mobileW20)

    db.session.add_all(mobileW_list)

# seed desktop wallpaper (maybe 30, leaving 6 to add later?)
    print("adding Desktop Wallpapers...")
    desktopW_list =[]

    desktopW1 = DesktopWallpaper(
        title = "Seattle 054",
        location = "Seattle, WA, USA",
        year = 2012,
        path = "/images/h3000pxLongEdge/20120719_Seattle_054.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW1)

    desktopW2 = DesktopWallpaper(
        title = "Orchard off i5 003",
        location = "Central CA, USA",
        year = 2013,
        path = "/images/h3000pxLongEdge/20130307_i5_003.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW2)

    desktopW3 = DesktopWallpaper(
        title = "Dune du Pilat 692",
        location = "Dune du Pilat, France",
        year = 2014,
        path = "/images/h3000pxLongEdge/20140920_Dune_du_Pilat_692.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW3)

    desktopW4 = DesktopWallpaper(
        title = "Dune du Pilat 677",
        location = "Dune du Pilat, France",
        year = 2014,
        path = "/images/h3000pxLongEdge/20140920_Dune_du_Pilat_677.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW4)

    desktopW5 = DesktopWallpaper(
        title = "Windmills 63",
        location = "Palm Springs, CA, USA",
        year = 2009,
        path = "/images/h3000pxLongEdge/windmills_063.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW5)

    desktopW6 = DesktopWallpaper(
        title = "Midtown Manhattan from L.I.C",
        location = "Queens, NY, USA",
        year = 2006,
        path = "/images/h3000pxLongEdge/un_9hrz_1_2.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW6)

    desktopW7 = DesktopWallpaper(
        title = "Seattle Space Needle 003",
        location = "Seattle, WA, USA",
        year = 2009,
        path = "/images/h3000pxLongEdge/Seattle_003.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW7)

    desktopW8 = DesktopWallpaper(
        title = "Meilen 029",
        location = "Meilen, Switzerland",
        year = 2011,
        path = "/images/h3000pxLongEdge/Meilen_029.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW8)

    desktopW9 = DesktopWallpaper(
        title = "Meilen 038",
        location = "Meilen, Switzerland",
        year = 2011,
        path = "/images/h3000pxLongEdge/Meilen_038.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW9)

    desktopW10 = DesktopWallpaper(
        title = "macau_105",
        location = "Macau, SAR of PRC",
        year = 2008,
        path = "/images/h3000pxLongEdge/macau_105.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW10)

    desktopW11 = DesktopWallpaper(
        title = "macau_127",
        location = "Macau, SAR of PRC",
        year = 2008,
        path = "/images/h3000pxLongEdge/macau_127.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW11)

    desktopW12 = DesktopWallpaper(
        title = "macau_130",
        location = "Macau, SAR of PRC",
        year = 2006,
        path = "/images/h3000pxLongEdge/macau_130.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW12)

    desktopW13 = DesktopWallpaper(
        title = "hk 319",
        location = "Lantau Island, HK, SAR of PRC",
        year = 2008,
        path = "/images/h3000pxLongEdge/hk_319.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW13)

    desktopW14 = DesktopWallpaper(
        title = "Golden_Circle_339_OG",
        location = "Iceland",
        year = 2014,
        path = "/images/h3000pxLongEdge/Golden_Circle_339_OG.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW14)

    desktopW15 = DesktopWallpaper(
        title = "Camel_Safari_350",
        location = "Rajasthan, India",
        year = 2010,
        path = "/images/h3000pxLongEdge/Camel_Safari_350.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW15)

    desktopW16 = DesktopWallpaper(
        title = "Oregon_Coast_032",
        location = "Oregon Coast, USA",
        year = 2010,
        path = "/images/h3000pxLongEdge/Oregon_Coast_032.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW16)

    desktopW17 = DesktopWallpaper(
        title = "Rheinfall_087",
        location = "Switzerland",
        year = 2011,
        path = "/images/h3000pxLongEdge/Rheinfall_087.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW17)

    desktopW18 = DesktopWallpaper(
        title = "Agra_275",
        location = "Agra, Uttar Pradesh, India",
        year = 2010,
        path = "/images/h3000pxLongEdge/Agra_275.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW18)

    desktopW19 = DesktopWallpaper(
        title = "Agra_213",
        location = "Agra, Uttar Pradesh, India",
        year = 2010,
        path = "/images/h3000pxLongEdge/Agra_213.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW19)

    desktopW20 = DesktopWallpaper(
        title = "Oregon_Coast_151",
        location = "OR, USA",
        year = 2010,
        path = "/images/h3000pxLongEdge/Oregon_Coast_151.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW20)

    desktopW21 = DesktopWallpaper(
        title = "lndneye1-1",
        location = "London, UK",
        year = 2005,
        path = "/images/h3000pxLongEdge/lndneye1-1.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW21)
    
    desktopW22 = DesktopWallpaper(
        title = "lib2.1",
        location = "Rochester, NY, USA",
        year = 2008,
        path = "/images/h3000pxLongEdge/lib2-1.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW22)

    desktopW23 = DesktopWallpaper(
        title = "Boise_154",
        location = "Boise, ID, USA",
        year = 2009,
        path = "/images/h3000pxLongEdge/Boise_154.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW23)

    desktopW24 = DesktopWallpaper(
        title = "Oregon Coast 017",
        location = "OR, USA",
        year = 2010,
        path = "/images/h3000pxLongEdge/Oregon_Coast_017.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW24)

    desktopW25 = DesktopWallpaper(
        title = "Dune du Pilat 688",
        location = "Dune du Pilat, France",
        year = 2014,
        path = "/images/h3000pxLongEdge/20140920_Dune_du_Pilat_668.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW25)

    desktopW26 = DesktopWallpaper(
        title = "Agra 213",
        location = "Agra, Uttar Pradesh, India",
        year = 2010,
        path = "/images/h3000pxLongEdge/Agra_213.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW26)

    desktopW27 = DesktopWallpaper(
        title = "Oregon Coast 026",
        location = "OR, USA",
        year = 2010,
        path = "/images/h3000pxLongEdge/Oregon_Coast_026.jpg",
        user_id = randint(1, x),
    )
    desktopW_list.append(desktopW27)

    db.session.add_all(desktopW_list)

    # print("Coming up with comments to add...")
    # comment_list = []

    # for i in range(len(mobileW_list)):
    #     sentence = fake.


    db.session.commit()
    print("Database seed complete - now it's entirely up to you!")

if __name__ == '__main__':
    # fake = Faker()
    with app.app_context():
        print("Starting seed process...")
        seed_data()
