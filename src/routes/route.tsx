import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Voting from "../pages/Voting";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
               path: '/voting',
               element: <Voting />
            }
        ]
    },
]);
