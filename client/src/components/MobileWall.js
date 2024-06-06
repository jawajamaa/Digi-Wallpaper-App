import { Box, Container, Grid, ImageList, Paper } from "@mui/material";
import MobileCard from "./MobileCard";
import { MobileWallContext } from "../AppContext";
import { useContext } from "react";

function MobileWall() {
    const { mobileWallState } = useContext(MobileWallContext);


    return(
        <div className = "MobileWall">
            <Box sx={{ mt: 10, ml: 17, width: 1000, height: 750, overflowY: 'scroll' }}>
                <ImageList variant="masonry" cols={4} gap={8}>
                    {
                        mobileWallState.map(mobilepaper => (
                            <MobileCard 
                                key = { mobilepaper.id }
                                mobilepaper = { mobilepaper }
                            />
                        ))
                    }
                </ImageList> 
            </Box>

            {/* <Container>
                <Grid container spacing={3}>
                        {
                            mobileWallState.map(mobilepaper => (
                                <MobileCard 
                                    key = { mobilepaper.id }
                                    mobilepaper = { mobilepaper }
                                />
                            ))
                        }
                </Grid>
            </Container> */}
        </div>
    );
}

export default MobileWall
