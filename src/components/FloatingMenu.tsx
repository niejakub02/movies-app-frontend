import { Button, useTheme } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';

type props = {
    role?: number
}

const FloatingMenu = ({ role }:props) => {
    const navigate = useNavigate();
    const theme = useTheme();

    const handleLogOut = () => {
        localStorage.removeItem("access_token");
        navigate("SignIn");
    }

    return (
        <div style={{ position: 'absolute', top: 0, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Button
                sx={{ zIndex: 1, fontWeight: 'bolder', margin: 3, fontSize: '1.5rem', transition: 'opacity 250ms ease-in-out', opacity: 0.5, color: '#a1a1a1', '&:hover': { color: role ? theme.palette.secondary.main : theme.palette.primary.main, opacity: 1 } }}
                variant="text"
                component={Link}
                to="Dashboard"
            >
                Movies-app
            </Button>
            <Button
                sx={{ zIndex: 1, fontWeight: 'bolder', margin: 3, fontSize: '1.5rem', transition: 'opacity 250ms ease-in-out', opacity: 0.5, color: '#a1a1a1', '&:hover': { color: role ? theme.palette.secondary.main : theme.palette.primary.main, opacity: 1 } }}
                variant="text"
                onClick={handleLogOut}
            >
                Logout
            </Button>
        </div>

    );
}

export default FloatingMenu;