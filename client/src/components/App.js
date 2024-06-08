import React, { useEffect, useState } from "react";
// import { Route } from "react-router-dom";
// import { Switch, Route } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { MobileWallContext, DesktopWallContext, RefreshContext, ServerRouteContext, UserContext } from "../AppContext";
// import NavBar from "./NavBar";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { Outlet } from "react-router-dom";

const server_routes = {
  baseUrl : "http://127.0.0.1:5555",
  mobileRoute : "/mobilepapers",
  desktopRoute : "/desktoppapers",
  commentsRoute: "/comments",
  usersRoute: "/users"
}
// const baseUrl = "http://127.0.0.1:5555"
// const mobileRoute = "/mobilepapers"
// const desktopRoute = "/desktoppapers"
// const commentsRoute= "/comments"

function App() {
  const[toggleDarkMode, setToggleDarkMode] = useState(true);
  const[serverRoutesState, setServerRoutesState] = useState(server_routes);
  const[mobileWallState, setMobileWallState] = useState([]);
  const[desktopWallState, setDesktopWallState] = useState([]);
  const[userState, setUserState] = useState([]);
  const[refreshState, setRefreshState] = useState(false);
  // const[randomDesktop, setRandomDesktop] = useState(null);

  console.log(server_routes.baseUrl + server_routes.mobileRoute)
  // fetch MobileWallpapers (vertical)
  useEffect(() => {
    fetch(server_routes.baseUrl + server_routes.mobileRoute)
      .then(r => r.json())
      .then(data => {
        setMobileWallState(data)
      });
  }, [refreshState])
  
  console.log(mobileWallState)

  // fetch DesktopWallpapers (horizontal)
  useEffect(() => {
    fetch(server_routes.baseUrl + server_routes.desktopRoute)
      .then(r => r.json())
      .then(data => {
        setDesktopWallState(data)
      });
  }, [refreshState])

  console.log(desktopWallState)
  
  // fetch Users
    useEffect(() => {
      fetch(server_routes.baseUrl + server_routes.usersRoute)
        .then(r => r.json())
        .then(data => {
          setUserState(data)
        });
    }, [refreshState])
  
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
            <DesktopWallContext.Provider value = { {desktopWallState, setDesktopWallState} }>
              <RefreshContext.Provider value = { {refreshState, setRefreshState} }>
                <ServerRouteContext.Provider value = {{ serverRoutesState, setServerRoutesState }}>
                  <UserContext.Provider value = {{ userState, setUserState }}>
                    <Outlet />
                  </UserContext.Provider>
                </ServerRouteContext.Provider>
              </RefreshContext.Provider>
            </DesktopWallContext.Provider>
          </MobileWallContext.Provider>
          <CssBaseline />
        </main>
      </Container>
    </ThemeProvider>
  )
}

export default App;
