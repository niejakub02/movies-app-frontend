import { TextField, Box } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import React from "react";
import client from "../utils/API";
import { toast } from "react-toastify";

const SignIn: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const navigate = useNavigate();

    React.useEffect(() => {
        if (localStorage.getItem("access_token")) {
            navigate('/dashboard');
        }
    }, [])

    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        client.post('User/SignIn', {
            Username: e.target.username.value,
            Password: e.target.password.value
        })
            .then(res => {
                localStorage.setItem("access_token", res.data);
                navigate("Dashboard")
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <form onSubmit={onSubmitHandler}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column', gap: 2, width: 345 }}>
                    <TextField
                        label="Username"
                        name="username"
                        variant="outlined"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        variant="outlined"
                        type="password"
                    />
                    <Button
                        sx={{ height: '3rem' }}
                        variant="outlined"
                        type="submit"
                        disabled={isLoading}
                    >
                        Sign in
                    </Button>
                    <Button
                        sx={{ height: '3rem' }}
                        variant="text"
                        component={Link}
                        to="/SignUp"
                        type="submit"
                    >
                        Don't have account?
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

export default SignIn;