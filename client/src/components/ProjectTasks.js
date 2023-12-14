import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from "dayjs";

import TaskModal from "./TaskModal";

function ProjectTasks({users}) {
    const params = useParams();
    const [tasks, setTasks] = useState([]);
    const [team, setTeam] = useState([])
    // const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    useEffect(() => {
        fetch(`/projects/${params.id}/tasks`)
        .then((r) => {
            if (r.ok) {
                r.json().then(tasks => setTasks(tasks))
            } else {
                r.json().then(({error}) => console.log(error))
            }
        })

        fetch(`/projects/${params.id}/team-members`)
        .then((r) => {
            if (r.ok) {
                r.json().then(teamMembers => setTeam(teamMembers))
            } else {
                r.json().then(({error}) => console.log(error))
            }
        })
    }, [])

    const columns = [
        {
            field: 'task',
            headerName: 'Task',
            minWidth: 300,
            flex: 1
        },
        {
            field: 'startDate',
            headerName: 'Start Date',
            width: 100,
        },
        {
            field: 'endDate',
            headerName: 'Due Date',
            width: 100,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
        },
        {
            field: 'user',
            headerName: 'Team Member',
            width: 150,
        },
        {
            field: 'edit',
            headerName: 'Edit Task',
            sortable: false,
            width: 100,
            cellClassName: 'edit-task-button--cell',
            renderCell: (params) => (
                <span>
                    <TaskModal task={params.row.taskDetail} tasks={tasks} setTasks={setTasks} users={users} />
                </span>
            )
        }
    ]

    const rows = tasks ? tasks.map(task => {
        return ({
            id: task.id,
            taskDetail: task,
            task: task.name,
            startDate: dayjs(task.start_date).format('YYYY-MM-DD'),
            endDate: dayjs(task.end_date).format('YYYY-MM-DD'),
            status: task.status,
            user: task.user ? task.user.name : ""
        })
    }) : [];

    return (
        <Paper
            elevation={2}
            sx={{ 
                mt: 2,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <Box 
                sx={{ 
                    width: '100%', 
                    display: 'flex',
                    justifyContent: 'center',
                }} 
            >
                <DataGrid 
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick 
                    getRowHeight={() => 'auto'}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        '.MuiDataGrid-columnHeaders': {
                            backgroundColor: '#2B2D42',
                            color: 'white',
                        },
                        '.MuiDataGrid-menuIconButton': {
                            color: 'white'
                        },
                        '.MuiDataGrid-sortIcon': {
                            color: 'white'
                        },
                        '.MuiDataGrid-cell:focus': {
                            outline: "none",
                        },
                        '& .edit-task-button--cell': {
                            paddingLeft: 0,
                        },
                    }}
                />
            </Box>
                {tasks && team ? <TaskModal task={""} tasks={tasks} setTasks={setTasks} team={team} /> : null}
        </Paper>
    )
}

export default ProjectTasks