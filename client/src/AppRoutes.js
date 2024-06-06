import App from "./components/App";
import ErrorPage from "./components/ErrorPage";
import DesktopWall from "./components/DesktopWall";
import MobileWall from "./components/MobileWall";
import AddWallpaper from "./components/AddWallpaper";


const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/MobileWall",
                element: <MobileWall />
            },
            {
                path: "/DesktopWall",
                element: <DesktopWall />
            },
            {
                path: "/AddWallpaper",
                element: <AddWallpaper />
            }
        ]
    }
];

export default routes;
