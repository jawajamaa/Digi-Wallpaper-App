import { Container, Grid, Paper } from "@mui/material";
import MobileCard from "./MobileCard";


function MobileWall() {

    return(
        <div className = "MobileWall">
            <Container>
                <Grid container spacing={3}>
                    <MobileCard />
                </Grid>
            </Container>
        </div>
    );
}

export default MobileWall
