import client from "../utils/API";
import React from "react";
import { Backdrop, Box, CircularProgress, Pagination, Typography } from "@mui/material";
import FloatingMenu from "../components/FloatingMenu";

const History = () => {
    const [history, setHistory] = React.useState<any[]>([]);
    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const [pages, setPages] = React.useState<number>(0);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        pageChangeRequest(1);
    }, [])

    const pageChangeRequest = (page: number) => {
        setIsLoading(true);
        client.post(`User/History/${page}`)
            .then((res) => {
                setHistory(res.data.rentedMovies)
                setPages(res.data.pages);
                setCurrentPage(res.data.currentPage);
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const handlePageChange = (e: any, value: number) => {
        pageChangeRequest(value);
    }

    return (
        <>
            <Backdrop
                sx={{ color: '#fff' }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 4rem)', gap: '2rem', margin: '2rem 0' }}>
                <FloatingMenu role={0} />

                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, minHeight: 'calc(100vh - 8rem)' }}>
                    {
                        history.map(record =>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'baseline' }} key={crypto.randomUUID()}>
                                <Typography color="primary" variant="h6">
                                    {record.title}
                                </Typography>
                                <Typography color="white">
                                    {new Date(record.startDate).toLocaleString()}
                                </Typography>
                                <Typography color="white">
                                    →
                                </Typography>
                                <Typography color="white">
                                    {new Date(record.endDate).toLocaleString()}
                                </Typography>
                            </Box>
                        )
                    }
                </Box>

                <Pagination count={pages} color="primary" onChange={handlePageChange} page={currentPage} />
            </Box>
        </>
    );
}

export default History;