import React, { useContext, useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { RefreshContext, ServerRoutesContext } from "../AppContext";

import SubmitButton from "./SubmitButton";


function UserFound({ foundUser }) {
    const { serverRoutesState } = useContext(ServerRoutesContext);
    // const { userState } = useContext(UserContext);
    const { refreshState, setRefreshState } = useContext(RefreshContext);

    const {baseUrl,
        usersRoute
        } = serverRoutesState

    console.log(foundUser)
    console.log(foundUser.username)
    // console.log(foundUser.name)
    // console.log(foundUser.email)
    // console.log(foundUser.id)

    const formSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, "Name must be at least 2 characters")
            .required("User must not be nameless!"),
        email: Yup.string()
            .email()
            .required("User must have an email address")
    });

    const formik = useFormik({
        initialValues: {
            username: foundUser.username,
            name: foundUser.name,
            email: foundUser.email
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch((`${baseUrl}${usersRoute}/${foundUser.id}`), {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then(r => r.json())
            .then(r => {
                if (r.ok) {
                    setRefreshState(!refreshState)
                }
            })
        }
    })
    

    return (
    <>
        {/* <p style={{ color:'green'}}> User Found! </p> */}
        <h2>Enter Name here</h2>
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
            
            <label htmlFor="email">Email</label>
            <br />
            <input 
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            <p style={{ color:'red'}}> {formik.errors.email} </p>


        <SubmitButton type = "submit" label = "Update User" />
        </form>
    </>);
}

export default UserFound;
