import { Button, Box, Card, CardActions, CardContent, CardMedia, TextField, Typography, Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import AddMoviePopup from "../components/AddMoviePopup";
import FloatingMenu from "../components/FloatingMenu";
import client from "../utils/API";
import { NO_IMAGE } from "../utils/Consts";

const Add: React.FC = () => {
    const [input, setInput] = React.useState<string>("");
    const [movies, setMovies] = React.useState<any[]>([]);
    const [open, setOpen] = React.useState<boolean>(false);
    const [currentMovie, setCurrentMovie] = React.useState<any>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const searchHandler = (e: any) => {
        setIsLoading(true);
        e.preventDefault();
        client.get(`https://imdb-api.com/en/API/SearchMovie/k_zs7mkfe3/${input}`)
            .then((res) => {
                console.log(res);
                setMovies(res.data.results);
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const addMovieHandler = (e: any, movie: any) => {
        setOpen(true);
        setCurrentMovie(movie);
    }

    return (
        <>
            <Backdrop
                sx={{ color: '#fff' }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <AddMoviePopup open={open} setOpen={setOpen} movie={currentMovie} mode='ADD' />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', margin: '2rem 0' }}>
                <FloatingMenu role={1} />

                <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '4rem' }}
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
                                image={movie.image != '' ? movie.image : NO_IMAGE}
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
                                sx={{ display: 'flex', alignItems: 'flex-end' }}
                            >
                                <Button
                                    size="small"
                                    onClick={(e) => addMovieHandler(e, movie)}
                                    color="secondary"
                                >
                                    Add
                                </Button>
                                <a
                                    href={`https://www.imdb.com/title/${movie.id}`}
                                    target="_blank"
                                >
                                    <Button
                                        size="small"
                                        color="secondary"
                                    >
                                        IMDb
                                    </Button>
                                </a>
                            </CardActions>
                        </Card>
                    )}
                </Box>
            </div>
        </>
    );
}

export default Add;