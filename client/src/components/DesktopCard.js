import { ImageListItem } from "@mui/material";


function DesktopCard({ desktoppaper }) {
    const{
        id,
        title,
        location,
        year,
        path,
        user_id
    } = desktoppaper;

    return(
        <ImageListItem key = {id}>
            <img 
                src= { path } 
                alt= { title } 
            />
        </ImageListItem>
    );
};

export default DesktopCard;
