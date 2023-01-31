import { Button, Pagination, Box, Card, CardActions, CardContent, CardMedia, TextField, Typography, Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import AddMoviePopup from "../components/AddMoviePopup";
import FloatingMenu from "../components/FloatingMenu";
import client from "../utils/API";
import { NO_IMAGE } from "../utils/Consts";

const Manage = () => {
    const [input, setInput] = React.useState<string>("");
    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const [pages, setPages] = React.useState<number>(0);
    const [movies, setMovies] = React.useState<any[]>([]);
    const [open, setOpen] = React.useState<boolean>(false);
    const [currentMovie, setCurrentMovie] = React.useState<any>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const navigate = useNavigate();

    const pageChangeRequest = (page: number, input: string) => {
        setIsLoading(true);
        client.post(`Movie/Search/${page}`, input)
            .then((res) => {
                setMovies(res.data.movies);
                setPages(res.data.pages);
                setCurrentPage(res.data.currentPage);
            }).finally(() => {
                setIsLoading(false)
            })
    }

    React.useEffect(() => {
        pageChangeRequest(1, "");
    }, [])

    // React.useEffect(() => {
    //     // brzydkie, ale na razie zostawiam tak
    //     if (open == false) pageChangeRequest(currentPage)
    // }, [open])
    const onPopupCloseHandler = () => {
        pageChangeRequest(currentPage, input);
    }

    const handlePageChange = (e: any, value: number) => {
        pageChangeRequest(value, input);
    }

    const editMovieHandler = (e: any, movie: any) => {
        setOpen(true);
        setCurrentMovie(movie);
    }

    const deleteMovieHandler = (e: any, id: number) => {
        setIsLoading(true);
        client.delete(`Movie/${id}`)
            .then(res => {
                console.log(res);
            })
            .finally(() => {
                pageChangeRequest(currentPage, input)
                if (movies.length == 1) pageChangeRequest(currentPage - 1, input)
            })
    }

    const searchHandler = (e: any) => {
        e.preventDefault();
        pageChangeRequest(1, input)
    }

    return (
        <>
            <Backdrop
                sx={{ color: '#fff' }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <AddMoviePopup open={open} setOpen={setOpen} movie={currentMovie} onPopupCloseHandler={onPopupCloseHandler} mode='EDIT' />

            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', minHeight: 'calc(100vh - 4rem)', gap: '2rem', margin: '2rem 0' }}>
                <FloatingMenu role={1} />

                <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '4rem', width: '100%' }}
                    onSubmit={searchHandler}
                >
                    <TextField
                        sx={{ width: '40%', height: '100%', '.MuiInputBase-root': { height: '100%', borderTopRightRadius: 0, borderBottomRightRadius: 0 } }}
                        color="secondary"
                        onChange={(e) => setInput(e.target.value)}
                    >

                    </TextField>
                    <Button
                        size="large"
                        onClick={searchHandler}
                        sx={{ height: '100%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                        variant="outlined"
                        color="secondary"
                    >
                        Search
                    </Button>
                </form>

                <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}
                >
                    {movies.map(movie =>
                        <Card
                            sx={{ width: 300, display: 'grid', gridTemplate: 'max-content max-content 1fr / auto' }}
                            key={movie.id}
                        >
                            <CardMedia
                                sx={{ height: 140 }}
                                image={movie.poster != '' ? movie.poster : NO_IMAGE}
                                component="img"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {movie.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {movie.description}
                                </Typography>
                            </CardContent>
                            <CardActions
                                sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}
                            >
                                <Box>
                                    <Button
                                        size="small"
                                        color="warning"
                                        onClick={(e) => editMovieHandler(e, movie)}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        size="small"
                                        color="error"
                                        onClick={(e) => deleteMovieHandler(e, movie.id)}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                                <Typography variant="body1" color="text.primary" sx={{ p: 0.5 }}>
                                    {`${movie.price},-`}
                                </Typography>
                            </CardActions>
                        </Card>
                    )}
                </Box>

                <Pagination count={pages} color="secondary" onChange={handlePageChange} page={currentPage} />
            </Box>
        </>
    );
}

export default Manage;