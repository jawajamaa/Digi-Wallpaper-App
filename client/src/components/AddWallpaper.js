import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";


function AddWallpaper() {

    const formSchema = yup.object().shape({
        title: yup
            .string()
            .title("Invalid title")
            .required("Image must have a title"),
        year: yup
            .number()
            .positive()
            .integer()
            .typeError("Please enter a number")
            .min(4, "Year must 4 digits")
            .max(4, "Year must 4 digits"),
        location: yup
            .string()
            .location("Please enter the location using letter not numbers")
            .required("Image must have a location, eg, Earth"),
        url: yup
            .string()
            .url("Image url must be string")
            .required("Image must have a url or a path from which to be loaded"),
        username: yup
            .string()
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
            
        }
    })
// title, year, location image taken, path or url, username and name?
    return(
        <div>
            <h2>Wallpaper additions go here!</h2>
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

                <label htmlfor="username"> Username </label>
                <br />
                <input
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                <p style={{ color:'red'}}> {formik.errors.username} </p>

                <button type = "submit"> Submit </button>
            </form>

        </div>
    );
}

export default AddWallpaper;
