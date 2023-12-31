import { useOutletContext } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';

import UserProjects from "./UserProjects";
import Loading from "./Loading";
import TaskTable from './TaskTable';

function UserHome() {
    const {user, users, setProject, setRoles} = useOutletContext();

    if (!user) return <Loading />

    return (
        <Box>
            <Paper
                elevation={2} 
                sx={{
                    mt: 2,
                }}
            >
                <Typography sx={{m:1.5, pt:1, pb:1}} variant="h4">{user.name}</Typography>
            </Paper>
            <UserProjects user={user} setProject={setProject} setRoles={setRoles} />
            <TaskTable user={user} users={users} />
        </Box>
    )
}

export default UserHome