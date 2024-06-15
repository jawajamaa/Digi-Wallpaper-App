import { ImageListItem } from "@mui/material";
import { NavLink } from "react-router-dom";

// import mobileoverlay from "./MobileOverlay"

function Card({ id, title, location, year, horizontal, path, user_id }) {
    let overlay_route = horizontal ? `/desktopwall/${id}` : `/mobilewall/${id}`
    console.log(overlay_route)

    return(
        <NavLink
            to = { overlay_route }>
            <ImageListItem key = { id }>
                <img 
                    src= { path } 
                    alt= { title } 
                />
            </ImageListItem>
        </NavLink>
    )
};

export default Card;
