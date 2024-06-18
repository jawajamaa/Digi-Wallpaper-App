import { useContext } from "react";
import { Box, Grid, Rating, Typography } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";

import { CurrPaperContext, MobileWallContext } from "../AppContext";
import SubmitButton from "./SubmitButton"
import "./MobileOverlay.css";

function MobileOverlay() {
    const { mobileWallState } = useContext(MobileWallContext);
    const { currPaperState, setcurrPaperState } = useContext(CurrPaperContext);
    let { id } = useParams();
    id = parseInt(id)

    const foundPaper = mobileWallState.find(paper => paper.id === id)
    const commentArr = foundPaper.users.commentByUser

    function handleCurrPaper(){
        setcurrPaperState(foundPaper)
    }

    console.log(commentArr ? (
        commentArr.map(com => com.name)) : null)
    console.log(foundPaper)
    console.log(foundPaper.users.commentByUser)
    return(
        <div className = "overlay">
            <NavLink
                className="close"
                to="/mobilewall"
                >X</NavLink>
            <div className="content">
                <Grid container spacing={3}>
                    {/* <Grid item xs="auto"> */}
                    <Grid item xs={3}>
                        <div className="typography">
                            <Typography>
                                <h4>{ foundPaper.title }</h4>
                                <h4>{ foundPaper.location }</h4>
                                <h4>{ foundPaper.year }</h4>
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        {<img
                            src= { foundPaper.path }
                            alt= { foundPaper.title }
                            height = { "800" }
                        />}
                    </Grid>
                    {/* <Grid item xs="auto"> */}
                    <Grid item xs={3}>
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
                            to = "/makecomment"
                            >
                            <SubmitButton type = "button" onClick = { handleCurrPaper }label = "Add your thoughts..."/>
                        </NavLink>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
};

export default MobileOverlay;
