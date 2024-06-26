import { useContext } from "react";
import { CurrPaperContext, DesktopWallContext } from "../AppContext";

import { Grid, Rating, Typography } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import SubmitButton from "./SubmitButton"
import "./DesktopOverlay.css";

function DesktopOverlay() {
    const { desktopWallState } = useContext(DesktopWallContext);
    const { setCurrPaperState } = useContext(CurrPaperContext);
    let { id } = useParams();
    id = parseInt(id)

    const foundPaper = desktopWallState.find(paper => paper.id === id)
    const commentArr = foundPaper.users.commentByUser

    function handleCurrPaper(){
        setCurrPaperState(foundPaper)
    }

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
                        <h2>Comments</h2>
                        <ul>
                            {commentArr ? (commentArr.map(com => (
                                <Typography>
                                    <Rating name="read-only" value={com.rating} readOnly />
                                    <li>{com.comment}--{com.name}</li>
                                    <li>_______________________________________________</li>
                                </Typography>))) :
                            null }
                        </ul>
                        <NavLink
                            className = "commentLink"
                            to = "/makedesktopcomment"
                            >
                            <SubmitButton type = "button" onClick = { handleCurrPaper }label = "Add your thoughts..."/>
                        </NavLink>
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
