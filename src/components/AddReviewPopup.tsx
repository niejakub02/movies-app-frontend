import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { TextField, Typography, Backdrop, CircularProgress, Rating } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import client from '../utils/API';

type props = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    movie: any,
}

function AddReviewPopup({ open, setOpen, movie }: props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [description, setDescription] = React.useState<string>('');
    const [rating, setRating] = React.useState<number | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        // TODO: check whether user already submitted a review
        if (movie.id === undefined) return;

        client.get(`/Movie/${movie.id}/Review`)
        .then(res => {
            setRating(res.data.rating ?? null);
            setDescription(res.data.description ?? '');
        })
        .finally(() => {
            setIsLoading(false);
        })
    }, [movie])

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e: any) => {
        setIsLoading(true);
        e.preventDefault();

        client.post(`/Movie/${movie.id}/Review`, {
            rating,
            description
        }).then(res => {
            console.log(res);
        })
        .finally(() => {
            setIsLoading(false);
            setOpen(false);
        })
    }

    return (
        <>


            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <form>
                    <DialogTitle id="responsive-dialog-title" color="primary">
                        Add movie
                    </DialogTitle>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 550, width: '100vw' }}>
                        <Typography>
                            {`You are reviewing '${movie.title}' movie.`}
                        </Typography>
                        <Rating
                            name="rating"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                        />
                        <Typography color="primary">Review:</Typography>
                        <TextField
                            value={description}
                            multiline
                            rows={6}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isLoading}
                        ></TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} autoFocus type="submit" disabled={isLoading}>
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default AddReviewPopup