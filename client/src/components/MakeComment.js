import { useContext } from "react";
import { Box, Grid, ImageList, Typography } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";

import { CurrPaperContext } from "../AppContext";
import SubmitButton from "./SubmitButton";
// import { MobileWallContext, DesktopWallContext } from "../AppContext";

function MakeComment() {
    // const { desktopWallState } = useContext(DesktopWallContext);
    // const { MobileWallContext } = useContext(MobileWallContext);
    const { currPaperState, setcurrPaperState } = useContext(CurrPaperContext);
    

    console.log(currPaperState)

    return(
        <div className="content">
                <Grid container spacing={3}>
                    {/* <Grid item xs="auto"> */}
                    <Grid item xs={3}>
                        <div className="typography">
                            <Typography>
                                <h4>{ currPaperState.title }</h4>
                                <h4>{ currPaperState.location }</h4>
                                <h4>{ currPaperState.year }</h4>
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        {<img
                            src= { currPaperState.path }
                            alt= { currPaperState.title }
                            height = { "800" }
                        />}
                    </Grid>
                    {/* <Grid item xs="auto"> */}
                    <Grid item xs={3}>
                        <h2>Share thoughts below</h2>
                        <Box>
                            <h4>Formik form here</h4>
                        </Box>
                            <SubmitButton type = "submit"/>
                    </Grid>
                </Grid>
            </div>
    )
};
export default MakeComment;
