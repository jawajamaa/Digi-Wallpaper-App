import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
// import { Switch, Route } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Card, CardContent, CardMedia, Container, Grid, Switch, Typography } from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { MobileWallContext, DesktopWallContext } from "../AppContext";
import MobileWall from "./MobileWall";
import NavBar from "./NavBar";

const baseUrl = "http://127.0.0.1:5555"
const mobileRoute = "/mobilepapers"
const desktopRoute = "/desktoppapers"

function App() {
  const[toggleDarkMode, setToggleDarkMode] = useState(true);
  const[mobileWallState, setMobileWallState] = useState([])
  const[desktopWallState, setDesktopWallState] = useState([])
  const[randomDesktop, setRandomDesktop] = useState(null)

  // fetch MobileWallpapers (vertical)
  useEffect(() => {
    fetch(baseUrl + mobileRoute)
      .then(r => r.json())
      .then(data => {
        setMobileWallState(data)
      });
  }, [])
  
  // fetch DesktopWallpapers (horizontal)
  useEffect(() => {
    fetch(baseUrl + desktopRoute)
      .then(r => r.json())
      .then(data => {
        setDesktopWallState(data)
      });
  }, [])

  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
  };

  // applyng the primary and secondary theme colors
  const darkTheme = createTheme({
    palette: {
      mode: toggleDarkMode ? 'dark' : 'light',
      primary: {
        main: '#1E1E1E'
      },
      secondary: {
        main: '#D9D9D9'
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <header>
          <NavBar
            toggleDarkMode = { toggleDarkMode }
            toggleDarkTheme = { toggleDarkTheme }
           />
        </header>
        <main>
          <MobileWallContext.Provider value = { {mobileWallState, setMobileWallState} }>
          <Grid container spacing={7}>
            <MobileWall />
          </Grid>
          <CssBaseline />
          </MobileWallContext.Provider>
        </main>
        {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Project Client</h1>
        <h2>Toggle Dark Mode</h2>
        <Switch checked={toggleDarkMode} onChange={toggleDarkTheme} />
        <Card sx={{ width: "30%", borderRadius: 3, padding: 1 }}>
          <CardContent>
            <CardMedia 
              sx={{ height: 180, borderRadius: 3 }}>
              <img 
                src="/images/h3000pxLongEdge/un_9hrz_1_2.jpg"  
                alt="Manhattan as seen from L.I.C"
                width="300" 
              />
              </CardMedia>
            <Typography variant="h4" component="div" sx={{ marginTop: 3 }}>
              Some Title
            </Typography>
            <Typography sx={{ mb: 1.5 }} color = "text.secondary">
              Some sub-Title
            </Typography>
            <Typography variant="body1">
              This is the body of the page.
            </Typography>
          </CardContent>
        </Card>
        </div> */}
        {/* <Grid container spacing={7}>
          <MobileWall />
        </Grid>
        <CssBaseline /> */}
      </Container>
    </ThemeProvider>
  )
}

export default App;
