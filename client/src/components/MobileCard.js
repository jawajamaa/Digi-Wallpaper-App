import { ImageListItem } from "@mui/material";
 

function MobileCard({ mobilepaper }) {
    const{
        id,
        title,
        location,
        year,
        path,
        user_id
    } = mobilepaper;

    return(
        <ImageListItem key = {id}>
            <img 
                src= { path } 
                alt= { title } 
            />
        </ImageListItem>
    );
};

export default MobileCard;
