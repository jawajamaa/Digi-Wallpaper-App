import App from "./components/App";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import DesktopOverlay from "./components/DesktopOverlay";
import DesktopWall from "./components/DesktopWall";
import MobileOverlay from "./components/MobileOverlay";
import MobileWall from "./components/MobileWall";
import AddWallAccordion from "./components/AddWallAccordion";
import UserAccordion from "./components/UserAccordion";


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
                element: <MobileWall />,

            },
            {
                path: "/mobilewall/:id",
                element: <MobileOverlay />

            },
            {
                path: "/desktopwall",
                element: <DesktopWall />
            },
            {
                path: "/desktopwall/:id",
                element: <DesktopOverlay />

            },
            {
                path: "/addwallpaper",
                element: <AddWallAccordion />
            },
            {
                path: "/user",
                element: <UserAccordion />
            }
        ]
    }
];

export default routes;
