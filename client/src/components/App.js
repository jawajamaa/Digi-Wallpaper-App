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
import DesktopCard from "./DesktopCard";


function App() {
  const[toggleDarkMode, setToggleDarkMode] = useState(true);

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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
        </div>
        <Grid container spacing={7}>
          <DesktopCard />
        </Grid>
        <CssBaseline />
      </Container>
    </ThemeProvider>
  )
}

export default App;
