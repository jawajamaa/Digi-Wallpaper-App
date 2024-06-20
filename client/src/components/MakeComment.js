import { useContext } from "react";
import { Box, Grid, ImageList, Typography } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { CommentContext, CurrPaperContext, ServerRoutesContext } from "../AppContext";
import SubmitButton from "./SubmitButton";
// import { MobileWallContext, DesktopWallContext } from "../AppContext";

function MakeComment() {
    const { commentState, setCommentState } = useContext(CommentContext);
    const { currPaperState, setcurrPaperState } = useContext(CurrPaperContext);
    // const { desktopWallState } = useContext(DesktopWallContext);
    // const { MobileWallContext } = useContext(MobileWallContext);
    const { serverRoutesState } = useContext(ServerRoutesContext);
    const [userLookup, setUserLookup ] = useState({ "searched": false, "found": null});

    const {baseUrl,
        commentsRoute
    } = serverRoutesState;

    let schemaFields = {
        username: Yup.string()
            .min(8, "Username must be at least 8 characters")
            .required("User must have a username"),
    };
    if (userLookup.found) {
        schemaFields.rating = Yup.number()
            .positive()
            .integer()
            .typeError("Please enter a number") 
            .lessThan(5)
            .moreThan(0)
            .required("Comment must have a rating, even if it is 0");
        schemaFields.comment = Yup.string()
            .min(4, "Comment must have at least 4 characters")
            .required("A short comment must accompany the rating ");
    }


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
