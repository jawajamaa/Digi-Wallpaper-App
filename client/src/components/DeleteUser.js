import React, { useContext, useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { RefreshContext, ServerRoutesContext, UserContext } from "../AppContext";
import SubmitButton from "./SubmitButton";

function DeleteUser() {
    const { userState, setUserState } = useContext(UserContext);
    const { refreshState, setRefreshState } = useContext(RefreshContext);
    const { serverRoutesState } = useContext(ServerRoutesContext);

    const [userLookup, setUserLookup ] = useState(WaitingForInput);

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
                setUserLookup(new UserFound(found))
            } else {
                setUserLookup(UserNotFound)
            }
        }
    })
    
    function WaitingForInput() {
        return (<SubmitButton />);
    }
    
    function UserFound(foundUser) {
        function handleDeleteUser() {
            console.log(foundUser)
            console.log(foundUser.id)
            fetch((`${baseUrl}${usersRoute}/${foundUser.id}`), {
                method: "DELETE"
            }).then(r => r.json())
            .then(r => {
                if (r.ok) {
                    setRefreshState(!refreshState)
                }
            })
        };

        return (
        <>
            <p style={{ color:'green'}}> User Found! </p>
            <SubmitButton type = "button" onClick = { handleDeleteUser } label = "Delete User" />
        </>);
    }
    
    function UserNotFound() {
        return (<>
            <p style={{ color:'red'}}>User Not found!</p>
            <SubmitButton />
        </>)
    }
   
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
                {userLookup}
            </form>
        </div>
    );
}

export default DeleteUser;
