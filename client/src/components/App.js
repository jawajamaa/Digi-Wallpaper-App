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
import DesktopWall from "./DesktopWall";
// import NavBar from "./NavBar";
import ResponsiveAppBar from "./ResponsiveAppBar";

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
  
  console.log(mobileWallState)

  // fetch DesktopWallpapers (horizontal)
  useEffect(() => {
    fetch(baseUrl + desktopRoute)
      .then(r => r.json())
      .then(data => {
        setDesktopWallState(data)
      });
  }, [])

  console.log(desktopWallState)

  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
  };

  // applying the primary and secondary theme colors
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
          {/* <NavBar
            toggleDarkMode = { toggleDarkMode }
            toggleDarkTheme = { toggleDarkTheme }
           /> */}
           <ResponsiveAppBar 
              toggleDarkMode = { toggleDarkMode }
              toggleDarkTheme = { toggleDarkTheme }
            />
        </header>
        <main>
          <MobileWallContext.Provider value = { {mobileWallState, setMobileWallState} }>
            <MobileWall />
          </MobileWallContext.Provider>
          <DesktopWallContext.Provider value = { {desktopWallState, setDesktopWallState} }>
            <DesktopWall />
          </DesktopWallContext.Provider>
          <CssBaseline />
        </main>
      </Container>
    </ThemeProvider>
  )
}

export default App;
