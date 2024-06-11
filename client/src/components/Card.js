import { ImageListItem } from "@mui/material";


function Card({ wallpaper }) {
    const{
        id,
        title,
        location,
        year,
        path,
        user_id
    } = wallpaper;

    return(
        <ImageListItem key = {id}>
            <img 
                src= { path } 
                alt= { title } 
            />
        </ImageListItem>
    );
};

export default Card;
