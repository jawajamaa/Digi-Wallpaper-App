# Digi Wallpaper App

## Models

Mobile Wallpaper - vertical
Desktop Wallpaper - horizontal
Users (who submitted wallpaper)

### Styling
used MUI (Material UI) for styling and Dark Mode application, which I like, so I have as the default.  

The site displays both the Mobile and Desktop wallpaper, and a user can submit their own wallpaper to be included in the galleries.  To be added when I build on this more for the final project, is another model, Comments where users can make short comments am planning to incorporate ratings as MUI had those icons available as well, which was part of the choice to use MUI, but also just to use something new.

#### CRUD actions

CR available on both Mobile and Desktop models, and full CRUD on Users.  I used the accordion from MUI to make both visual models available under the same route, and since MUI also has a dropdown or option menu, may try to combine the two with an option to choose which kind of image is being submitted.

For Users, the full CRUD is available, as one can add a user, then under the Search and Update accordion option, first Search a username for the Read.  Note - everything is done by the username, but the id is found and used on the backend, as the User would not know, nor need to know their id and usernames are not displayed on purpose for privacy's sake, but can be searched if one knows the username to search. Then, when found, the Name and email can be updated, and finally, if one wishes to no longer be part of this community, can delete their User from the database.
