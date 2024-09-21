# Digi Wallpaper App

## Models

Mobile Wallpaper - vertical
Desktop Wallpaper - horizontal
Users (who submitted wallpaper)
Comments (with ratings by users)

## Construction and Use

This app has a React.js front-end styled with MUI (Material UI) making use of Formik for the controlled forms assisted by Yup for validations.  This built on a Python back-end utilizing Flask to run the server and SQLAlchemy as the ORM.  

Everything here uses a username, and on the back-end it translates the username to the User's id, as the User does not need to know what id the database assigned to them.  This so there is already some modicum of privacy as a User would have to guess what another Username might be in order to search for it.  
<!-- The app has routes for both Mobile and Desktop wallpaper, and a User can submit their own wallpaper to be included in the galleries, however in order to do that, a User needs to create a User in the database first.  The fourth model is Comments, where users can make short comments about the individual wallpapers, and if one selects any of the wallpapers from their respective gallery, they can see that specific image larger and on its own with any image information and related comments. In addition, there is also a rating by the user that posted the comment, utilizing the star rating icons available from MUI. -->


### Images
All Images © 2005 - 2024 tim ryon
