import { Box, ImageList } from "@mui/material";
import { useContext } from "react";

import { MobileWallContext } from "../AppContext";
import MobileCard from "./MobileCard";

function MobileWall() {
    const { mobileWallState } = useContext(MobileWallContext);


    return(
        <div className = "MobileWall">
            <Box sx={{ ml: 10, width: 1000, height: 750, overflowY: 'scroll' }}>
                <ImageList variant="masonry" cols={4} gap={8}>
                    {
                        mobileWallState?.map(mobilepaper => (
                            <MobileCard 
                                key = { mobilepaper.id }
                                mobilepaper = { mobilepaper }
                            />
                        ))
                    }
                </ImageList> 
            </Box>
        </div>
    );
}

export default MobileWall
