import React, { useContext, useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { RefreshContext, ServerRoutesContext, UserContext } from "../AppContext";
import SubmitButton from "./SubmitButton";

// NOTE: this component contains some more advanced code as I received some help to refactor for better logic and convince this component to work! :-)
// //////////////////////////////////////////////////////////////////////
function UpdateUser() {
    const { serverRoutesState } = useContext(ServerRoutesContext);
    const { userState } = useContext(UserContext);
    const { refreshState, setRefreshState } = useContext(RefreshContext);
    const [userLookup, setUserLookup ] = useState({ "searched": false, "found": null});
    const [userUpdated, setUserUpdated ] = useState(null);
    
    const {baseUrl,
        usersRoute
    } = serverRoutesState;
    
    let schemaFields = {
        username: Yup.string()
            .min(8, "Username must be at least 8 characters")
            .required("User must have a username"),
    };
    if (userLookup.found) {
        schemaFields.name = Yup.string()
            .min(2, "Name must have at least 2 characters")
            .required("User must have a name");
        schemaFields.email = Yup.string()
            .email()
            .required("User must have an email");
    }

    const formik = useFormik({
        initialValues: {
            username: "",
            name: "",
            email: "",
        },
        validationSchema: Yup.object().shape(schemaFields),
        onSubmit: (values) => {
            if (userLookup.found) {
                fetch((`${baseUrl}${usersRoute}/${userLookup.found.id}`), {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }).then(r => {
                    if (r.ok) {
                        setRefreshState(!refreshState);
                        setUserLookup({"searched": false, "found": null});
                        setUserUpdated(true);
                        formik.resetForm();
                    }
                })
            } else {
                let found = userState.find(p => p.username === values.username)
                console.log(found)
                formik.values.name = found?.name || "";
                formik.values.email = found?.email || "";
                setUserLookup({"searched": true, "found": found})
            }
        }
    })   

    return(
        <div>
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
                </div>

                {userLookup.searched && !userLookup.found ? <p style={{ color:'red'}}>User Not found!</p> : null}
                <SubmitButton label={userLookup.found ? "Update" : "Search"} />
                {userUpdated ? <p style={{ color:'green'}}>User Updated successfully!</p> : null}
            </form>
        </div>
    );
}

export default UpdateUser;
