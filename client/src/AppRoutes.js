import AddWallAccordion from "./components/AddWallAccordion";
import App from "./components/App";
import DesktopOverlay from "./components/DesktopOverlay";
import DesktopWall from "./components/DesktopWall";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import MakeDesktopComment from "./components/MakeDesktopComment";
import MakeMobileComment from "./components/MakeMobileComment";
import MobileOverlay from "./components/MobileOverlay";
import MobileWall from "./components/MobileWall";
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
                path: "/makemobilecomment",
                element: <MakeMobileComment />
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
                path: "/makedesktopcomment",
                element: <MakeDesktopComment />
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
