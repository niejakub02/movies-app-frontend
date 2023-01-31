import React from "react";
import "./../css/Home.scss";
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Button } from "@mui/material";
import { userDetails } from "../utils/ProtectedRoute";
import FloatingMenu from "../components/FloatingMenu";

const Home: React.FC = () => {
    const background = React.useRef<any>();
    const userDetails: userDetails = useOutletContext();
    const navigate = useNavigate();

    const mouseMoveHandler = (e: any) => {
        const X = 50 + Number(((e.pageX / (window.innerWidth)) * 100).toFixed(4)) / 4
        const Y = 50 + Number(((e.pageY / (window.innerHeight)) * 100).toFixed(4)) / 4
        background.current.animate([
            { backgroundPosition: `${X}% ${Y}%` }
        ], { duration: 50, fill: 'forwards', easing: 'ease-in-out' })
    }

    const handleMouseOver = () => {
        background.current.animate([
            { backgroundSize: '133%', boxShadow: '0 0 100px 40px #000000 inset' }
        ], { duration: 500, fill: 'forwards', easing: 'ease-in-out' })

    }

    const handleMouseLeave = () => {
        background.current.animate([
            { backgroundSize: '125%', boxShadow: '0 0 100px 5px #000000 inset' }
        ], { duration: 500, fill: 'forwards', easing: 'ease-in-out' })
    }

    return (
        <div
            className="container"
            onMouseMove={mouseMoveHandler}
        >
            <FloatingMenu role={userDetails.role} />

            <div
                className="container__background"
                ref={background}
            >
                <div
                    className="container__box"
                    onMouseOver={handleMouseOver}
                    onMouseLeave={handleMouseLeave}
                >
                    {
                        userDetails.role === 0 ?
                            <div
                                className="container__buttons"
                            >
                                <Button
                                    sx={{ zIndex: 1, fontWeight: 'bolder' }}
                                    variant="outlined"
                                    component={Link}
                                    to="/Rent"
                                >
                                    Rent
                                </Button>
                                <Button
                                    sx={{ zIndex: 1, fontWeight: 'bolder' }}
                                    variant="text"
                                    component={Link}
                                    to="/Collection"
                                >
                                    Collection
                                </Button>
                                <Button
                                    sx={{ zIndex: 1, fontWeight: 'bolder' }}
                                    variant="text"
                                    component={Link}
                                    to="/History"
                                >
                                    History
                                </Button>
                            </div>
                            : null
                    }

                    {
                        userDetails.role === 1 ?
                            <div
                                className="container__buttons"

                            >
                                <Button
                                    sx={{ zIndex: 1, fontWeight: 'bolder' }}
                                    variant="outlined"
                                    color="secondary"
                                    component={Link}
                                    to="/Manage"
                                >
                                    Manage
                                </Button>
                                <Button
                                    sx={{ zIndex: 1, fontWeight: 'bolder' }}
                                    variant="text"
                                    color="secondary"
                                    component={Link}
                                    to="/Add"
                                >
                                    Add
                                </Button>
                                <Button
                                    sx={{ zIndex: 1, fontWeight: 'bolder' }}
                                    variant="text"
                                    color="secondary"
                                    component={Link}
                                    to="/Users"
                                >
                                    Users
                                </Button>
                            </div>
                            : null
                    }
                </div>

            </div>
        </div>
    );
}

export default Home;