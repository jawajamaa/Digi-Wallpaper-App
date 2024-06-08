import React, { useContext} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { RefreshContext, ServerRouteContext } from "../AppContext";

function AddUser() {
    const { serverRoutesState } = useContext(ServerRouteContext);
    const { refreshState, setRefreshState } = useContext(RefreshContext);

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
            console.log(values)
            fetch(baseUrl + usersRoute, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then(r => {
                if (r.status === 201) {
                    setRefreshState(!refreshState);
                }
            })
        }
    })

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
                <button type = "submit"> Submit </button>
            </form>
        </div>
    );
}

export default AddUser;
