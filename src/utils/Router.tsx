import {
    createBrowserRouter,
    Navigate
  } from "react-router-dom";
  import SignIn from "./../pages/SignIn";
  import ProtectedRoute from "./ProtectedRoute";
  import Home from "./../pages/Home";
  import Add from "./../pages/Add";
  import Manage from "./../pages/Manage";
  import Rent from "./../pages/Rent";
  import Collection from "./../pages/Collection";
  import SignUp from "./../pages/SignUp";
  import History from "./../pages/History";
  import 'react-toastify/dist/ReactToastify.css';
import Users from "../pages/Users";
  
const router = createBrowserRouter([
    {
        path: "SignIn",
        element: <SignIn />
    },
    {
        path: "SignUp",
        element: <SignUp />
    },
    {
        element: <ProtectedRoute requiredRole={0} />,
        children: [
            {
                path: "Dashboard",
                element: <Home />
            },
            {
                path: "Rent",
                element: <Rent />
            },
            {
                path: "Collection",
                element: <Collection />
            },
            {
                path: "History",
                element: <History />
            }
        ]
    },
    {
        element: <ProtectedRoute requiredRole={1} />,
        children: [
            {
                path: "Add",
                element: <Add />
            },
            {
                path: "Manage",
                element: <Manage />
            },
            {
                path: "Users",
                element: <Users />
            }
        ]
    },
    {
        path: "*",
        element: <Navigate to="SignIn" />
    },
]);

export default router;