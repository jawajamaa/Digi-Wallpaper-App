import { Card, CardContent, CardMedia, Container, Grid, Switch, Typography } from "@mui/material";


function NavBar({ toggleDarkMode, toggleDarkTheme }){
    return(
        <Container>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1>Wallpaper</h1>
                <h2>Dark Mode</h2>
                <Switch checked={toggleDarkMode} onChange={toggleDarkTheme} />
            </div>
        </Container>
    );
}
export default NavBar
