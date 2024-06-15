import { useContext } from "react";
import { MobileWallContext } from "../AppContext";

import { Box } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import "./MobileOverlay.css";

function MobileOverlay({}) {
    const { mobileWallState } = useContext(MobileWallContext);
    let { id } = useParams();
    id = parseInt(id)

    const foundPaper = mobileWallState.find(paper => paper.id === id)


    return(
        <div className = "overlay">
            <NavLink
                className="close"
                to="/mobilewall"
                >X</NavLink>
            <div className="content">
                <Box className="photo">
                    {<img
                        src= { foundPaper.path }
                        alt= { foundPaper.title }
                        height = { "800" }
                        />}
                </Box>
            </div>
        </div>
    )
};

export default MobileOverlay;
