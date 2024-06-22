import { useContext, useState } from "react";
import { Box, Grid, ImageList, Typography } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { CommentContext, CurrPaperContext, RefreshContext, ServerRoutesContext, UserContext } from "../AppContext";
import SubmitButton from "./SubmitButton";
// import { MobileWallContext, DesktopWallContext } from "../AppContext";

function MakeComment() {
    const { commentState, setCommentState } = useContext(CommentContext);
    const { currPaperState, setcurrPaperState } = useContext(CurrPaperContext);
    // const { desktopWallState } = useContext(DesktopWallContext);
    // const { MobileWallContext } = useContext(MobileWallContext);
    const { refreshState, setRefreshState } = useContext(RefreshContext);
    const { serverRoutesState } = useContext(ServerRoutesContext);
    const { userState } = useContext(UserContext);
    const [ comSubmitted, setComSubmitted ] = useState(null);
    const [ userLookup, setUserLookup ] = useState({ "searched": false, "found": null});
    const [ currUser, setCurrUser ] = useState({})

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
        .lessThan(6)
        .moreThan(-1)
        .required("Comment must have a rating, even if it is 0");
        schemaFields.comment = Yup.string()
        .min(4, "Comment must have at least 4 characters")
        .required("A short comment must accompany the rating ");
    }
    
    // console.log(currPaperState)
    // console.log(currPaperState.id)
// add state created by onChange to username initial values
    function nonFHandleChange(evt) {
        console.log(evt.target.value)
    }

    const formik = useFormik({
        initialValues: {
            username: "",
            rating: "",
            comment: "",
        },
        validationSchema: Yup.object().shape(schemaFields),
        onSubmit: (values) => {
            // use onChange for username?
            let foundUser = userState.find(p => p.username === values.username)
            console.log(values)
            // console.log(foundUser)
            if (!currPaperState.horizontal) {
                values.mobilewallpapers_id = currPaperState.id
                debugger
                values.name = userLookup.found.name
            } else {
                values.desktopwallpapers_id = currPaperState.id
                values.name = userLookup.found.name
            }
            console.log(values)
            if (userLookup.foundUser) {
                fetch((baseUrl + commentsRoute), {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }).then(r => {
                    if (r.ok) {
                        setRefreshState(!refreshState);
                        setComSubmitted(true);
                        setUserLookup({"searched": false, "found": null});
                        formik.resetForm();
                    }
                })
            } else {
                // let foundUser = userState.find(p => p.username === values.username)
                // change lines 85 and 86 as foundUser (a single User) does not have those attributes...
                console.log(foundUser)
                formik.values.rating = foundUser?.rating || "";
                formik.values.comment = foundUser?.comment || "";
                setUserLookup({"searched": true, "found": foundUser})
            }
        }
    })

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
                            height = { "700" }
                        />}
                    </Grid>
                    {/* <Grid item xs="auto"> */}
                    <Grid item xs={3}>
                        <h2>Share thoughts below</h2>
                        <Box>
                            <h2>Enter Username</h2>
                                <form onSubmit={formik.handleSubmit} style={{ margin: '30px'}}>

                                    <label htmlFor="username">Username</label>
                                    <br />
                                    <input 
                                        id="username"
                                        name="username"
                                        onChange={nonFHandleChange}
                                        // onChange={formik.handleChange}
                                        value={formik.values.username}
                                    />
                                    <p style={{ color:'red'}}> {formik.errors.username} </p>

                                    <div style={{display: (userLookup.found) ? "" : "none"}}>
                                        <label htmlFor="rating">rating</label>
                                        <br />
                                        <input 
                                            id="rating"
                                            name="rating"
                                            onChange={formik.handleChange}
                                            value={formik.values.rating}
                                        />
                                        <p style={{ color:'red'}}> {formik.errors.rating} </p>
                    
                                    <label htmlFor="comment">Comment</label>
                                    <br />
                                    <input 
                                        id="comment"
                                        name="comment"
                                        onChange={formik.handleChange}
                                        value={formik.values.comment}
                                    />
                                    <p style={{ color:'red'}}> {formik.errors.comment} </p>
                                </div>

                                {userLookup.searched && !userLookup.found ? <p style={{ color:'red'}}>Username Not found!</p> : null}
                                <SubmitButton label={userLookup.found ? "Post" : "Search"} />
                                {comSubmitted ? <p style={{ color:'green'}}>Comment posted successfully!</p> : null}
                            </form>
                        </Box>
                            {/* <SubmitButton type = "submit"/> */}
                    </Grid>
                </Grid>
            </div>
    )
};
export default MakeComment;
