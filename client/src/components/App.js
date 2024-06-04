import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
// import { Switch, Route } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Card, CardContent, CardMedia, Switch, Typography } from "@mui/material";

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
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Project Client</h1>
      <h2>Toggle Dark Mode</h2>
      <Switch checked={toggleDarkMode} onChange={toggleDarkTheme} />
      <Card sx={{ width: "30%", borderRadius: 3, padding: 1 }}>
        <CardContent>
          <CardMedia sx={{ height: 180, borderRadius: 3 }} image="../images/h3000pxLongEdge/un_9hrz_1_2.jpg" title="Manhattan as seen from L.I.C" alt="Manhattan as seen from L.I.C" />
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
    </ThemeProvider>
  )
}

export default App;
