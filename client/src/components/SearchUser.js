import React, { useContext, useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { UserContext } from "../AppContext";
import SubmitButton from "./SubmitButton";

function SearchUser() {
    const { userState } = useContext(UserContext);
    const [foundUser, setFoundUser ]   = useState(null);

    const formSchema = Yup.object().shape({
        username: Yup.string()
            .min(8, "Username must be at least 8 characters")
            .required("User must have a username"),
    });

    const formik = useFormik({
        initialValues: {
            username: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            let found = userState.find(p => p.username === values.username)
            if (found && found.username === values.username) {
                setFoundUser(true)
            } else {
                setFoundUser(false)
            }
        }
    })

    return(
        <div>
            <h2>Enter Username here</h2>
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
                
                {foundUser === null ? null : 
                foundUser ? <p style={{ color:'green'}}> User Found! </p> : 
                <p style={{ color:'red'}}>User Not found!</p>}
                {/* <SubmitButton /> */}
                <button type = "submit"> Submit </button>
            </form>
        </div>
    );
}

export default SearchUser;
