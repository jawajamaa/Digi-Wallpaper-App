import { Card, CardContent, CardMedia, Container, Grid, Switch, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";


function NavBar({ toggleDarkMode, toggleDarkTheme }){
    return(
        <Container>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography>
                <h1>Wallpaper</h1>
                <nav className = "nav-container">
                    <div
                        className = "nav-menu"
                        id = "nav-menu"
                    >
                        <ul className = "nav-list">
                            <li classname = "nav-item">
                                <NavLink
                                    to = ""
                                    // onClick = { handleAddClick }
                                >
                                    Add
                                </NavLink>
                            </li>
                            <li classname = "nav-item">
                                <NavLink
                                    to = ""
                                    // onClick = { handleCommentClick }
                                    >
                                        Comment
                                </NavLink>
                            </li>
                            <li classname = "nav-item">
                                <NavLink
                                    to = "/"
                                    // onClick = { handleHomeClick }
                                    >
                                        Home
                                </NavLink>
                            </li>
                            <li classname = "nav-item">
                                <NavLink
                                    to = "/DesktopWall"
                                    // onClick = { handleDesktopClick }
                                    >
                                        Desktop
                                </NavLink>
                            </li>
                            <li classname = "nav-item">
                                <NavLink
                                    to = "/MobileWall"
                                    // onClick = { handleMobileClick }
                                    >
                                        Mobile
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            
                    <h2>Dark Mode</h2>
                </Typography>
                <Switch checked={toggleDarkMode} onChange={toggleDarkTheme} />
            </div>
        </Container>
    );
}
export default NavBar
