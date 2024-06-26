import React, { useContext, useEffect } from "react";
import { ErrorMessage, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
import { Container, Grid, Typography } from "@mui/material";
import { Formik } from 'formik';

import { RefreshContext, ServerRoutesContext } from "../AppContext";

import SubmitButton from "./SubmitButton";

function AddWallpaper() {
    const { serverRoutesState } = useContext(ServerRoutesContext);
    const { refreshState, setRefreshState } = useContext(RefreshContext);

    const {baseUrl, desktopRoute} = serverRoutesState

    const formSchema = Yup.object().shape({
        title: Yup.string("Invalid title")
            .required("Image must have a title"),
        year: Yup.number()
            .positive()
            .integer()
            .typeError("Please enter a number") 
            .lessThan(2025)
            .moreThan(1822),
        location: Yup.string("Please enter the location using letter not numbers")
            .required("Image must have a location, eg, Earth"),
        url: Yup.string()
            .url("Image url must be string")
            .required("Image must have a url or a path from which to be loaded"),
        horizontal: Yup.string()
            .required("Image must have one aspect ratio or orientation selected"),
        username: Yup.string()
            .min(8, "Username must be at least 8 characters")      
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            year: "",
            location: "",
            url: "",
            horizontal: "",
            username: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(baseUrl + desktopRoute, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then(r => {
                if (r.status === 200) {
                    setRefreshState(!refreshState); 
                }
            });
        },
    });

    return(
        <Formik>
            <h2> Wallpaper Additions go here!</h2>
            <Form>
                <Grid container spacing={2}>
                    <Grid item xs={4}>

                    </Grid>
                </Grid>
                <label htmlFor="title">Image Title</label>
                <br />
                <input 
                    id="title"
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                <p style={{ color:'red' }}> {formik.errors.title} </p>

                <label htmlFor="year">Year Image taken</label>
                <br />
                <input
                    id="year"
                    name="year"
                    onChange={formik.handleChange}
                    value={formik.values.year}
                />
                <p style={{ color:'red'}}> {formik.errors.year} </p>

                <label htmlFor="location">Location Image taken</label>
                <br />
                <input
                    id="location"
                    name="location"
                    onChange={formik.handleChange}
                    value={formik.values.location}
                />
                <p style={{ color:'red'}}> {formik.errors.location} </p>

                <label htmlFor="url">Image Url</label>
                <br />
                <input
                    id="url"
                    name="url"
                    onChange={formik.handleChange}
                    value={formik.values.url}
                />
                <p style={{ color:'red'}}> {formik.errors.url} </p>

                <label htmlFor="horizontal">Image Orientation</label>
                <input 
                    id='select'
                    component='select' 
                    name = 'horizontal' 
                    placeholder='select options'
                    >
                    <option value={formik.values.horizontal}>Mobile (Vertical)</option>
                    <option value={formik.values.horizontal}>Desktop (Horizontal)</option>
                </input>      
                <p style={{ color:'red'}}> {formik.errors.horizontal} </p>                          
                {/* <div id="my-radio-group">Horizontal?</div> */}
                {/* <div role="group" aria-labelledby="my-radio-group">
                  <label>
                    <Field type="radio" name="horizontal" value="Yes" />
                    <Typography>
                        Yes
                    </Typography>
                  </label>
                  <label>
                    <Field type="radio" name="horizontal" value="No" />
                    <Typography>
                        No
                    </Typography>
                  </label>
                  <div>Horizontal? {formik.values.horizontal}</div>
                </div> */}

                <label htmlFor="username"> Username </label>
                <br />
                <input
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                <p style={{ color:'red'}}> {formik.errors.username} </p>

                <SubmitButton />
            </Form>
        </Formik>
    );
}

export default AddWallpaper;
