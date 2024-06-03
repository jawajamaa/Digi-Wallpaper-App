#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

# seed users with faker (maybe 20?)

# seed mobile wallpaper (maybe also 20, leaving 3 to add later?)

# seed desktop wallpaper (maybe 30, leaving 6 to add later?)
