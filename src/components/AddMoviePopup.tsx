import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { TextField, Typography, Backdrop, CircularProgress } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import client from '../utils/API';

type props = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    movie: any,
    mode: 'ADD' | 'EDIT',
    onPopupCloseHandler?: any
}

function AddMoviePopup({ open, setOpen, movie, mode, onPopupCloseHandler}: props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [title, setTitle] = React.useState<string>(movie.title);
    const [description, setDescription] = React.useState<string>(movie.description);
    const [price, setPrice] = React.useState<string>('0');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e: any) => {
        setIsLoading(true);
        e.preventDefault();

        if (mode === 'ADD') {
            client.post('/Movie', {
                title,
                description,
                price: +price,
                category: 'none',
                poster: movie.image,
                //guid: movie.id
            }).then(res => {

            }).finally(() => {
                handleClose();
                setIsLoading(false);
            })
        }

        if (mode === 'EDIT') {
            client.put(`/Movie/${movie.id}`, {
                title,
                description,
                price: +price,
                category: 'none',
                poster: movie.poster
            }).then(res => {
                console.log(res);
            }).finally(() => {
                handleClose();
                setIsLoading(false);
                onPopupCloseHandler();
            })
        }
    }

    React.useEffect(() => {
        setTitle(movie.title);
        setDescription(movie.description);
        setPrice(movie.price);
    }, [movie])

    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <form>
                    <DialogTitle id="responsive-dialog-title" color="secondary">
                        Add movie
                    </DialogTitle>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 550, width: '100vw' }}>
                        <Typography color="secondary">Title:</Typography>
                        <TextField
                            value={title}
                            sx={{ width: '100%' }}
                            color="secondary"
                            fullWidth
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={isLoading}
                        />
                        <Typography color="secondary">Description:</Typography>
                        <TextField
                            value={description}
                            multiline
                            color="secondary"
                            rows={3}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isLoading}
                        ></TextField>
                        <Typography color="secondary">Price:</Typography>
                        <TextField
                            value={price}
                            type="number"
                            inputProps={{ min: 0 }}
                            color="secondary"
                            onChange={(e) => setPrice(e.target.value)}
                            disabled={isLoading}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color="secondary" disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} autoFocus color="secondary" type="submit" disabled={isLoading}>
                            {mode.charAt(0).toUpperCase() + mode.slice(1).toLowerCase()}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default AddMoviePopup