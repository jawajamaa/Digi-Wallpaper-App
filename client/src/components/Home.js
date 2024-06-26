import React, { useContext, useEffect, useState } from "react";

import { DesktopWallContext } from "../AppContext";

import { Box, Container } from "@mui/material";

function Home(){
    // const{mobileWallState} = useContext(MobileWallContext);
    const{ desktopWallState } = useContext(DesktopWallContext);
    const[ randomWallState, setRandomWallState ] = useState(null);


    useEffect(() => {
        if (desktopWallState.length) {
            let randIdx = Math.floor(Math.random()*(desktopWallState.length))
            setRandomWallState(desktopWallState[randIdx])
        }
    }, [ desktopWallState ]);


    return(
        <Container disableGutters fixed={false} maxWidth="xl">
            {randomWallState && (
                <img
                    src = {randomWallState.path}
                    alt = {randomWallState.title}
                    width = { "1150" }
                    />
            )}
        </Container>
    );
}

export default Home;
