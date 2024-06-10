import React, { useContext, useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { RefreshContext, ServerRoutesContext, UserContext } from "../AppContext";

function DeleteUser() {
    const { userState, setUserState } = useContext(UserContext);
    const { refreshState, setRefreshState } = useContext(RefreshContext);
    const { serverRoutesState } = useContext(ServerRoutesContext);

    const [foundUserBool, setFoundUserBool ] = useState(null);
    const [foundUser, setFoundUser ] = useState("");

    const {baseUrl,
        usersRoute
        } = serverRoutesState 

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
                setFoundUserBool(true)
                setFoundUser(found)
            } else {
                setFoundUserBool(false)
            }
        }
    })
    
    function handleDeleteUser() {
        console.log(foundUser)
        console.log(foundUser.id)
        fetch((`${baseUrl}${usersRoute}/${foundUser.id}/`), {
            method: "DELETE"
        }).then(r => r.json())
        .then(r => {
            if (r.ok) {
                setRefreshState(!refreshState)
            }
        })
    };
    
    return(
        <div>
            <h2>Enter Username to Delete User</h2>
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

                {foundUserBool === null ? null : 
                foundUserBool ? 
                    <>
                        <p style={{ color:'green'}}> User Found! </p>
                        <button type = "button" onClick = { handleDeleteUser }>Delete User</button>
                    </> : 
                    <p style={{ color:'red'}}>User Not found!</p>}
                    
                <button type = "submit"> Submit </button>
            </form>
        </div>
    );
}

export default DeleteUser;
