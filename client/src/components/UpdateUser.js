import React, { useContext, useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { RefreshContext, UserContext } from "../AppContext";
import SubmitButton from "./SubmitButton";
import UserFound from "./UserFound"

function UpdateUser() {
    const { userState } = useContext(UserContext);
    const { refreshState, setRefreshState } = useContext(RefreshContext);
    const [foundUser, setFoundUser ] = useState([]);
    const [userLookup, setUserLookup ] = useState(<WaitingForInput />);

    const formSchema = Yup.object().shape({
        username: Yup.string()
            .min(8, "Username must be at least 8 characters")
            .required("User must have a username"),
    });

    function handleSetFoundUser(found){
        setFoundUser(found)
    }
    console.log(foundUser)
    
    const formik = useFormik({
        initialValues: {
            username: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            let found = userState.find(p => p.username === values.username)
            console.log(found)
            if (found && found.username === values.username) {
                handleSetFoundUser(found)
                // setFoundUser(found)
                // setRefreshState(refeshState)
                    setUserLookup(<UserFound 
                        foundUser = { found }
                    />)
            } else {
                setUserLookup(<UserNotFound />)
            }
        }
    })

    function WaitingForInput() {
        return (<SubmitButton />);
    }

    // function UserFound(foundUser) {

    //     function handleUpdateUser() {
    //         const formik = useFormik({
    //             initialValues: {
    //                 username: foundUser.username,
    //                 name: "",
    //                 email: ""
    //             },
    //             validationSchema: formSchema,
    //             onSubmit: (values) => {
    //                 fetch((`${baseUrl}${usersRoute}/${foundUser.id}`), {
    //                     method: 'PATCH',
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                     },
    //                     body: JSON.stringify(values),
    //                 }).then(r => r.json())
    //                 .then(r => {
    //                     if (r.ok) {
    //                         setRefreshState(!refreshState)
    //                     }
    //                 })
    //             }
    //         })
    //     }

    //     return (
    //     <>
    //         <p style={{ color:'green'}}> User Found! </p>
    //         <h2>Enter Name here</h2>
    //         <form onSubmit={formik.handleSubmit} style={{ margin: '30px'}}>

    //             <label htmlFor="name">Name</label>
    //             <br />
    //             <input 
    //                 id="name"
    //                 name="name"
    //                 onChange={formik.handleChange}
    //                 value={formik.values.name}
    //             />
    //             <p style={{ color:'red'}}> {formik.errors.name} </p>
                
    //             <label htmlFor="email">Email</label>
    //             <br />
    //             <input 
    //                 id="email"
    //                 name="email"
    //                 onChange={formik.handleChange}
    //                 value={formik.values.email}
    //             />
    //             <p style={{ color:'red'}}> {formik.errors.email} </p>


    //         <SubmitButton type = "button" onClick = { handleUpdateUser } label = "Update User" />
    //         </form>
    //     </>);
    // }
    
    function UserNotFound() {
        return (
            <>
                <p style={{ color:'red'}}>User Not found!</p>
                <SubmitButton />
            </>);
    }

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
                {userLookup}
                {/* {foundUser === null ? null : 
                foundUser ? <p style={{ color:'green'}}> User Found! </p> : 
                <p style={{ color:'red'}}>User Not found!</p>}
                <SubmitButton /> */}
            </form>
        </div>
    );
}

export default UpdateUser;
