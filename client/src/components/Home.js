import React, { useContext, useEffect, useState } from "react";

import { MobileWallContext, DesktopWallContext } from "../AppContext";

import { Box } from "@mui/material";

function Home(){
    const{mobileWallState} = useContext(MobileWallContext);
    const{desktopWallState} = useContext(DesktopWallContext);
    const[randomWallState, setRandomWallState] = useState([]);

    useEffect(() => {
        const randBin = Math.round(Math.random()*2)
        if (randBin === 0) {
            const randMobile = Math.floor(Math.random()*(mobileWallState.length))
            setRandomWallState(mobileWallState[randMobile])
        } else {
            const randDesktop = Math.floor(Math.random()*(desktopWallState.length))
            setRandomWallState(desktopWallState[randDesktop])
        }
        }   
    )

    return(
        <Box 
            alignItems="center"
            sx={{ height: '100vh'}}
            >
            {randomWallState && (
                <img
                    src = {randomWallState.path}
                    alt = {randomWallState.title}
                    width = { "1200" }
                    height = { "750" }
                    />
            )}
        </Box>
    );
}

export default Home;
