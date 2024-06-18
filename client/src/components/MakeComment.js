import { useContext } from "react";
import { Box, ImageList } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";

import { CurrPaperContext } from "../AppContext";
// import { MobileWallContext, DesktopWallContext } from "../AppContext";

function MakeComment() {
    // const { desktopWallState } = useContext(DesktopWallContext);
    // const { MobileWallContext } = useContext(MobileWallContext);
    const { currPaperState, setcurrPaperState } = useContext(CurrPaperContext);
    

    console.log(currPaperState)

    return(
        <h4>Make a Comment here!!</h4>
    )
};
export default MakeComment;
