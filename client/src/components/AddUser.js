import React, { useContext, useEffect, useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { RefreshContext, ServerRoutesContext, UserContext } from "../AppContext";
import SubmitButton from "./SubmitButton";

function AddUser() {
    const { serverRoutesState } = useContext(ServerRoutesContext);
    const { userState } = useContext(UserContext);
    const { refreshState, setRefreshState } = useContext(RefreshContext);
    const [userTaken, setUserTaken ] = useState({ "searched": false, "taken": null});
    // const [userLookup, setUserLookup ] = useState({ "searched": false, "found": null});

    const {baseUrl,
        usersRoute
        } = serverRoutesState 

    const formSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, "Name must be at least 2 characters")
            .required("User must not be nameless!"),
        username: Yup.string()
            .min(8, "Username must be at least 8 characters")
            .required("User must have a username"),
        email: Yup.string()
            .email()
            .required("User must have an email address")
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            email: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            let found = userState.find(p => p.username === values.username)
            if (found && found.username === values.username) {
                setUserTaken({ "searched": true, "taken": true})
            } else {
            fetch(baseUrl + usersRoute, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then(r => {
                if (r.status === 201) {
                    setRefreshState(!refreshState);
                    setUserTaken({ "searched": true, "taken": false})
                    formik.resetForm();
                }
            })
        }}
    })
    
    function handleUserTakenReset() {
        if (userTaken.taken)
            setTimeout((setUserTaken({"searched": true, "taken": false})), 5000 ) 
        console.log("after setTimeout in handleUserTakenReset") 
    }

    return(
        <div>
            <h2>Add Users here</h2>
            <form onSubmit={formik.handleSubmit} style={{ margin: '30px'}}>

                <label htmlFor="name">Name</label>
                <br />
                <input 
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                <p style={{ color:'red'}}> {formik.errors.name} </p>

                <label htmlFor="username">Username</label>
                <br />
                <input 
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                <p style={{ color:'red'}}> {formik.errors.username} </p>

                <label htmlFor="email">Email Address</label>
                <br />
                <input 
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <p style={{ color:'red'}}> {formik.errors.email} </p>

                {!userTaken.searched ? null :  userTaken.taken ? <p style={{ color:'red'}}> Username already taken - Please choose a different Username</p>  : null}
                {refreshState ? <p style={{ color:'red'}}> New User Submitted! </p> : null}
                <SubmitButton />
            </form>
        </div>
    );
}

export default AddUser;
