import App from "./components/App";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import DesktopWall from "./components/DesktopWall";
import MobileWall from "./components/MobileWall";
import AddWallpaper from "./components/AddWallpaper";
import AddUser from "./components/AddUser";


const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/mobilewall",
                element: <MobileWall />
            },
            {
                path: "/desktopwall",
                element: <DesktopWall />
            },
            {
                path: "/addwallpaper",
                element: <AddWallpaper />
            },
            {
                path: "/adduser",
                element: <AddUser />
            }
        ]
    }
];

export default routes;
