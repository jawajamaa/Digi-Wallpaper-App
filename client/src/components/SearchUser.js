import React, { useContext, useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { UserContext } from "../AppContext";

function AddUser() {
    const { userState, setUserState } = useContext(UserContext);
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
            console.log(foundUser)
            let found = userState.find(p => p.username === values.username)
            console.log(found ? found.username : "User not found");
            console.log(values.username)
            console.log(found ? (found.username === values.username) : false )
            if (found && found.username === values.username) {
                console.log(foundUser)
                setFoundUser(true)
            } else {
                setFoundUser(false)
            }
        }
    })
    console.log(foundUser)
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

                {!foundUser ? null : foundUser ? <p style={{ color:'green'}}> User Found! </p> : <p style={{ color:'red'}}>User Not found!</p>}
                <button type = "submit"> Submit </button>
            </form>
        </div>
    );
}

export default AddUser;
