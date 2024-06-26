import { useContext, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { redirect } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { CurrPaperContext, DesktopWallContext, RefreshContext, ServerRoutesContext, UserContext } from "../AppContext";
import SubmitButton from "./SubmitButton";
import "./MakeDesktopComment.css";


function MakeDesktopComment() {
    // const { commentState, setCommentState } = useContext(CommentContext);
    const [comSubmitted, setComSubmitted] = useState(null);
    const { currPaperState, setCurrPaperState } = useContext(CurrPaperContext);
    const { desktopWallState } = useContext(DesktopWallContext);
    const [localPaperState, setLocalPaperState] = useState([])
    const { refreshState, setRefreshState } = useContext(RefreshContext);
    const { serverRoutesState } = useContext(ServerRoutesContext);
    const [userLookup, setUserLookup] = useState({ "searched": false, "found": null});
    const { userState } = useContext(UserContext);

    const {baseUrl, commentsRoute} = serverRoutesState;

    const isEmptyObject = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;

    const safeParseJSON = (jsonString) => {
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            console.error("Failed to parse JSON:", error);
            return null;
        }
    };

    useEffect(() => {
        const storedUserData = localStorage.getItem('localPaper');
        if (!isEmptyObject(storedUserData)) {
                console.log(storedUserData)
                const parseData = safeParseJSON(storedUserData);
                if (parseData) {
                    setLocalPaperState(parseData);
                } else {
                    redirect ('/');
                }
        } else {
            redirect ('/');
        }
    },[]);

    useEffect(() => {
        console.log(currPaperState);
        if (!isEmptyObject(currPaperState)) {
            const localPaper = Object.keys(currPaperState).filter(objKey =>
                objKey !== 'users').reduce((newObj, key) => {
                    newObj[key] = currPaperState[key];
                    return newObj;
                }, {});
            localStorage.setItem('localPaper', JSON.stringify(localPaper))
            localStorage.setItem('localImgId', JSON.stringify(localPaper.id))
        } else {
            const storedImgId = localStorage.getItem('localImgId');
            if (storedImgId) {
                const parseImgId = JSON.parse(storedImgId);
                const foundImg = desktopWallState.find(paper => paper.id === parseImgId)
                if (foundImg) {
                    const localPaper = Object.keys(foundImg).filter(objKey =>
                        objKey !== 'users').reduce((newObj, key) => {
                            newObj[key] = currPaperState[key];
                            return newObj
                        }, {});
                    localStorage.setItem('localPaper', JSON.stringify(localPaper))
                    setCurrPaperState(foundImg);
                }
            }
        }
    }, [currPaperState, desktopWallState, setCurrPaperState])

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

    const formik = useFormik({
        initialValues: {
            username: "",
            rating: "",
            comment: "",
        },
        validationSchema: Yup.object().shape(schemaFields),
        onSubmit: (values) => {
            let foundUser = userState.find(p => p.username === values.username)
            console.log(values)
            console.log(foundUser.name)
            if (currPaperState.horizontal) {
                values.desktopwallpapers_id = currPaperState.id
                values.name = foundUser.name
            } else {
                values.mobilewallpapers_id = currPaperState.id
                values.name = foundUser.name
            }
console.log(values)
            if (userLookup.found) {
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
                formik.values.rating = foundUser?.rating || "";
                formik.values.comment = foundUser?.comment || "";
                setUserLookup({"searched": true, "found": foundUser})
            }
        }
    })

    return(
        <Grid container >
            <Grid item xs={12} sm={9} md={9}>
                {<img
                    src= { currPaperState.path || localPaperState.path }
                    alt= { currPaperState.title || localPaperState.title }
                    height = { "550" }
                />}
            </Grid>
            {/* <Grid item xs="auto"> */}
            <Grid item xs={12} sm={3} md={3} sx={{mr: 0}}>
                <h2>Share thoughts below</h2>
                <h2>Enter Username</h2>
                    <form onSubmit={formik.handleSubmit} style={{ margin: '30px'}}>
                        <label htmlFor="username">Username</label>
                        <br />
                        <input 
                            id="username"
                            name="username"
                            onChange={formik.handleChange}
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
            </Grid>
            {/* <Grid item xs="auto"> */}
            <Grid item xs={12} sm={12} md={12}>
                <div className="typography">
                    <Typography>
                        <h4>{ currPaperState.title || localPaperState.title }</h4>
                        <h4>{ currPaperState.location || localPaperState.location }</h4>
                        <h4>{ currPaperState.year || localPaperState.year }</h4>
                    </Typography>
                </div>
            </Grid>
        </Grid>
    )
};
export default MakeDesktopComment;
