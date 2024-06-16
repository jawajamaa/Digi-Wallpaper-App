import { useContext } from "react";
import { DesktopWallContext } from "../AppContext";

import { Box, Grid, Typography } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import "./DesktopOverlay.css";

function DesktopOverlay({}) {
    const { desktopWallState } = useContext(DesktopWallContext);
    let { id } = useParams();
    id = parseInt(id)

    const foundPaper = desktopWallState.find(paper => paper.id === id)


    return(
        <div className = "overlay">
            <NavLink
                className="close"
                to="/desktopwall"
                >X</NavLink>
            <div className="content">
                <Grid container spacing={3}>
                    {/* <Grid item xs="auto"> */}
                    <Grid item xs={9}>
                        {<img
                            src= { foundPaper.path }
                            alt= { foundPaper.title }
                            height = { "700" }
                        />}
                    </Grid>
                    <Grid item xs={3}>
                    {/* <Grid item xs={3}> */}
                        <h4>Rating</h4>
                        <h2>Comments</h2>
                    </Grid>
                    <Grid item xs="auto">
                        <div className="typography">
                            <Typography>
                                <h4>{ foundPaper.title }</h4>
                                <h4>{ foundPaper.location }</h4>
                                <h4>{ foundPaper.year }</h4>
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
};

export default DesktopOverlay;
