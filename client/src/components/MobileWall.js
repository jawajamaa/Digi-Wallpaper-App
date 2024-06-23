import { Box, ImageList } from "@mui/material";
import { useContext } from "react";

import { MobileWallContext } from "../AppContext";
import Card from "./Card";

function MobileWall() {
    const { mobileWallState } = useContext(MobileWallContext);


    return(
        <div className = "MobileWall">
            <Box sx={{ ml: 10, width: 1000, height: 750, overflowY: 'scroll' }}>
                <ImageList variant="masonry" cols={4} gap={8}>
                    {
                        mobileWallState?.map(mobilepaper => (
                            <Card 
                                key = { mobilepaper.id }
                                id = { mobilepaper.id }
                                title = { mobilepaper.title }
                                location = { mobilepaper.location }
                                year = { mobilepaper.year }
                                horizontal = { mobilepaper.horizontal }
                                path = { mobilepaper.path }
                                user_id = { mobilepaper.user_id }
                            />
                        ))
                    }
                </ImageList> 
            </Box>
        </div>
    );
}

export default MobileWall
