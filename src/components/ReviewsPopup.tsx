import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Divider, List, ListItem, ListItemText, Rating, Typography } from '@mui/material'

type props = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    reviews: any[],
    title: string
}

const ReviewsPopup = ({ open, setOpen, reviews, title }: props) => {

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {`Reviews for '${title}'`}
            </DialogTitle>
            <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
                <List sx={{ width: '100%', maxHeight: '75vh', overflowY: 'scroll', minWidth: 300, maxWidth: 600 }}>
                    {
                        reviews && reviews.map(review =>
                            <Box key={`review-${review.id}`}>
                                <ListItem sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, my: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", width: '100%' }}>
                                        <Typography variant="h6" color="primary.dark">
                                            {review.user.username}
                                        </Typography>
                                        <Typography color="primary">
                                            {new Date(review.date).toLocaleString()}
                                        </Typography>
                                    </Box>
                                    <Typography>
                                        {review.description}
                                    </Typography>
                                    <Rating readOnly value={review.rating} />
                                </ListItem>
                                <Divider />
                            </Box>
                        )
                    }
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ReviewsPopup;