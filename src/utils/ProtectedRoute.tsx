import { CircularProgress, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import client from "./API";

export type userDetails = {
    id?: number,
    role?: number
}

type props = {
    requiredRole: number
}

const ProtectedRoute = ({ requiredRole }:props) => {
    const [auth, setAuth] = useState(false);
    const [userDetails, setUserDetails] = useState<userDetails>({});

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        client.get('/User/Verify').then(res => {
            setUserDetails(res.data as userDetails);
            if (res.data.role >= requiredRole) {
                if (!auth) setAuth(true)
            }
            else {
                setAuth(false)
                navigate("/")
            }
        }).catch(err => {
            if (auth) setAuth(false);
            localStorage.removeItem("access_token");
            navigate("/");
        })
    }, [location.pathname]);

    if (!auth) return <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>

    return <Outlet context={userDetails} />
}
 
export default ProtectedRoute;