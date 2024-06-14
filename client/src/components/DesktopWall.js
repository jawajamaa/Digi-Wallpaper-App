import { Box, ImageList} from "@mui/material";
import { useContext } from "react";

import { DesktopWallContext } from "../AppContext";
import Card from "./Card";

function DesktopWall() {
    const { desktopWallState } = useContext(DesktopWallContext);


    return(
        <div className = "DesktopWall">
            <Box sx={{ ml: 10, width: 1000, height: 750, overflowY: 'scroll' }}>
                <ImageList variant="masonry" cols={4} gap={8}>
                    {
                        desktopWallState?.map(desktoppaper => (
                            <Card 
                                key = { desktoppaper.id }
                                id = { desktoppaper.id }
                                title = { desktoppaper.title }
                                location = { desktoppaper.location }
                                year = { desktoppaper.year }
                                horizontal = { desktoppaper.horizontal }
                                path = { desktoppaper.path }
                                user_id = { desktoppaper.user_id }
                            />
                        ))
                    }
                </ImageList> 
            </Box>
        </div>
    );
}

export default DesktopWall
