import React, { useEffect, useState } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { MobileWallContext, DesktopWallContext, RefreshContext, ServerRoutesContext, UserContext } from "../AppContext";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { Outlet } from "react-router-dom";

const server_routes = {
  baseUrl : "http://127.0.0.1:5555",
  mobileRoute : "/mobilepapers",
  desktopRoute : "/desktoppapers",
  commentsRoute: "/comments",
  usersRoute: "/users"
}

function App() {
  const[toggleDarkMode, setToggleDarkMode] = useState(true);
  const[serverRoutesState, setServerRoutesState] = useState(server_routes);
  const[mobileWallState, setMobileWallState] = useState([]);
  const[desktopWallState, setDesktopWallState] = useState([]);
  const[userState, setUserState] = useState([]);
  const[refreshState, setRefreshState] = useState(false);


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
  
    console.log(userState)


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
           <ResponsiveAppBar 
              toggleDarkMode = { toggleDarkMode }
              toggleDarkTheme = { toggleDarkTheme }
            />
        </header>
        <main>
          <MobileWallContext.Provider value = { {mobileWallState, setMobileWallState} }>
            <DesktopWallContext.Provider value = { {desktopWallState, setDesktopWallState} }>
              <RefreshContext.Provider value = { {refreshState, setRefreshState} }>
                <ServerRoutesContext.Provider value = {{ serverRoutesState, setServerRoutesState }}>
                  <UserContext.Provider value = {{ userState, setUserState }}>
                    <Outlet/>
                  </UserContext.Provider>
                </ServerRoutesContext.Provider>
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
