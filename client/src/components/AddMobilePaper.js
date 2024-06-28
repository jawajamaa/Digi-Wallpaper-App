import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { RefreshContext, ServerRoutesContext } from "../AppContext";

import SubmitButton from "./SubmitButton";

function AddMobilePaper() {
    const { serverRoutesState } = useContext(ServerRoutesContext);
    const { refreshState, setRefreshState } = useContext(RefreshContext);

    const { baseUrl, mobileRoute } = serverRoutesState

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
        horizontal: Yup.boolean(),
        username: Yup.string()
            .min(8, "Username must be at least 8 characters")      
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            year: "",
            location: "",
            url: "",
            username: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(baseUrl + mobileRoute, {
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
        <div>
            <h2>Mobile (Vertical) Wallpaper additions go here!</h2>
            <form onSubmit={formik.handleSubmit} style={{ margin: '30px'}}>

                <label htmlfor="title">Image Title</label>
                <br />
                <input 
                    id="title"
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                <p style={{ color:'red' }}> {formik.errors.title} </p>

                <label htmlfor="year">Year Image taken</label>
                <br />
                <input
                    id="year"
                    name="year"
                    onChange={formik.handleChange}
                    value={formik.values.year}
                />
                <p style={{ color:'red'}}> {formik.errors.year} </p>

                <label htmlfor="location">Location Image taken</label>
                <br />
                <input
                    id="location"
                    name="location"
                    onChange={formik.handleChange}
                    value={formik.values.location}
                />
                <p style={{ color:'red'}}> {formik.errors.location} </p>

                <label htmlfor="url">Image Url</label>
                <br />
                <input
                    id="url"
                    name="url"
                    onChange={formik.handleChange}
                    value={formik.values.url}
                />
                <p style={{ color:'red'}}> {formik.errors.url} </p>

                <label htmlfor="horizontal"> Is this Image Horizontal? </label>
                <br />
                <input
                    id="horizontal"
                    name="horizontal"
                    type="checkbox"
                    value="false"
                    onChange={formik.handleChange}
                    checked={formik.values.horizontal ? "checked" : ""}
                />
                <p style={{ color:'red'}}> {formik.errors.horizontal} </p>

                <label htmlfor="username"> Username </label>
                <br />
                <input
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                <p style={{ color:'red'}}> {formik.errors.username} </p>

                <SubmitButton />
            </form>
        </div>
    );
}

export default AddMobilePaper;
