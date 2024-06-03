#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports


# Views go here!

@app.route('/')
def home():
    return '<h1>Mobile and Desktop Wallpaper</h1>'
# have randomly rotating image show up.  Perhaps only rotating through desktop images, but if ever deployed, desktop or mobile depending on device

# 1) Mobile view
#   1a) Mobile overlay view with comments?
# 2) Desktop view
#   2a) Desktop overlay view with comments?
# 1) Add new wallpaper view

if __name__ == '__main__':
    app.run(port=5555, debug=True)
