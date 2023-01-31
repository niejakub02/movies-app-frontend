import client from "../utils/API";
import React from "react";
import { Backdrop, Box, CircularProgress, Pagination, Typography, ButtonGroup, Button } from "@mui/material";
import FloatingMenu from "../components/FloatingMenu";

const Users = () => {
    const [users, setUsers] = React.useState<any[]>([]);
    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const [pages, setPages] = React.useState<number>(0);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        pageChangeRequest(1);
    }, [])

    const pageChangeRequest = (page: number) => {
        setIsLoading(true);
        client.post(`User/Users/${page}`)
            .then((res) => {
                setUsers(res.data.users)
                setPages(res.data.pages);
                setCurrentPage(res.data.currentPage);
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const handlePageChange = (e: any, value: number) => {
        pageChangeRequest(value);
    }
    
    const blockHandler = (e: any, id: number, block: boolean) => {
        setIsLoading(true);
        client.put(`User/${id}/Block`, block)
            .then((res) => {
                console.log(res);
            })
            .finally(() => {
                pageChangeRequest(currentPage)
            })
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
                        users.map(user =>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'baseline' }} key={crypto.randomUUID()}>
                                <Typography color="white">
                                    {user.username}
                                </Typography>
                                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                    <Button disabled={user.isBlocked} onClick={(e) => blockHandler(e, user.id, true)}>Block</Button>
                                    <Button disabled={!user.isBlocked} onClick={(e) => blockHandler(e, user.id, false)}>Unblock</Button>
                                </ButtonGroup>
                            </Box>
                        )
                    }
                </Box>

                <Pagination count={pages} color="primary" onChange={handlePageChange} page={currentPage} />
            </Box>
        </>
    );
}

export default Users;