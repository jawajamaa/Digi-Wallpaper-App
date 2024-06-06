import { Container, Grid, Paper } from "@mui/material";
import MobileCard from "./MobileCard";
import { MobileWallContext } from "../AppContext";
import { useContext } from "react";

function MobileWall() {
    const { mobileWallState } = useContext(MobileWallContext);


    return(
        <div className = "MobileWall">
            <Container>
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
            </Container>
        </div>
    );
}

export default MobileWall
