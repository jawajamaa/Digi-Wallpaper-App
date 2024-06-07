import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";

import routes from "../AppRoutes"
import { MobileWallContext, DesktopWallContext } from "../AppContext";
import MobileWall from "./MobileWall";
import DesktopWall from "./DesktopWall";
import { Container } from "@mui/material";

function Home(){
    return(
        <Container>
            <p>Random Picture</p>
        </Container>
    );
}

export default Home;
