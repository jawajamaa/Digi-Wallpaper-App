import { ImageListItem } from "@mui/material";


function Card({ id, title, location, year, path, user_id }) {


    console.log(id)
    console.log(path)
    console.log(title)

    return(
        <ImageListItem key = { id }>
            <img 
                src= { path } 
                alt= { title } 
            />
        </ImageListItem>
    );
};

export default Card;
