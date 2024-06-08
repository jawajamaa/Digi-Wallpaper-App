import { Box, ImageList} from "@mui/material";
import { useContext } from "react";

import { DesktopWallContext } from "../AppContext";
import DesktopCard from "./DesktopCard";

function DesktopWall() {
    const { desktopWallState } = useContext(DesktopWallContext);


    return(
        <div className = "DesktopWall">
            <Box sx={{ ml: 10, width: 1000, height: 750, overflowY: 'scroll' }}>
                <ImageList variant="masonry" cols={4} gap={8}>
                    {
                        desktopWallState?.map(desktoppaper => (
                            <DesktopCard 
                                key = { desktoppaper.id }
                                desktoppaper = { desktoppaper }
                            />
                        ))
                    }
                </ImageList> 
            </Box>
        </div>
    );
}

export default DesktopWall
