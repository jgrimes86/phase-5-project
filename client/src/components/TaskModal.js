import { useState, useEffect } from "react";
import { useLocation, useParams } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";


import { Box, Button, Container, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from "dayjs";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    maxHeight: "75%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'scroll',
}

function TaskModal({task, tasks, setTasks, team}) {
    const location = useLocation();
    const params = useParams();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const formikSchema = yup.object().shape({
        name: yup.string().required('Must enter a task name'),
        description: yup.string(),
        start_date: yup.date(),
        end_date: yup.date().min(yup.ref('start_date')),
        status: yup.string(),
        comments: yup.string(),
    })

    const formik = useFormik({
        initialValues: {
            name: task.name ? task.name : "",
            description: task.description ? task.description : "",
            start_date: dayjs(task.start_date) ? dayjs(task.start_date) : dayjs(),
            end_date: dayjs(task.end_date) ? dayjs(task.end_date) : dayjs(),
            status: task.status ? task.status : "",
            comments: task.comments ? task.comments : "",
            user_id: task.user_id ? task.user_id : "",
        },
        // enableReinitialize: true,
        validationSchema: formikSchema,
        validateOnChange: false,
        onSubmit: (values) => {
            const url = task ? `/tasks/${task.id}` : `/projects/${params.id}/tasks`;
            const method = task ? 'PATCH' : 'POST';
            fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values, null, 2),
            })
            .then((r) => {
                if (r.ok) {
                    r.json()
                    .then((data) => {
                        if (task) {
                            setTasks(tasks.map(task => {
                                if (data.id === task.id) {
                                    return data
                                } else return task
                            }));
                        } else {
                            setTasks([...tasks, data])
                        };
                        handleClose()
                    })
                }
            })
        }
    })

    function handleDelete() {
        fetch(`/tasks/${task.id}`, {
            method: 'DELETE'
        })
        .then((r) => {
            if (r.ok) {
                setTasks(tasks.filter(t => {
                    if (t.id !== task.id) return t
                }));
                handleClose()
            } else {
                r.json().then(({error}) => console.log(error))
            }
        })
    }

    const taskTitle = (location.pathname===`/users/${params.id}`) ? task.project.name : task.name;


    const teamOptions = team ? team.map(tm => {
            return <MenuItem key={tm.id} value={tm.id}>{tm.name}</MenuItem>
    }) : [];


    // console.log("team options: ", teamOptions)
    // console.log("Task: ", task)

    const buttonText = task ? "Edit" : "Add Task";
    const saveButtonText = task ? "Save Changes" : "Create Task";

    return (
        <Box>
            <Button 
                variant = "contained"
                onClick={(e) => {
                    e.stopPropagation();
                    handleOpen()
                }}
            >
                {buttonText}
            </Button>
            <Modal
                open={open}
            >
                <Box sx={modalStyle}>
                    <Typography>
                        {taskTitle}
                    </Typography>
                    <Box 
                        component="form"
                        onSubmit={formik.handleSubmit}
                    >
                        <TextField
                            margin="normal"
                            fullWidth
                            id="name"
                            name="name"
                            label="Task Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.errors.name}
                            helperText={formik.errors.name}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            multiline
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="comments"
                            name="comments"
                            label="Comments"
                            multiline
                            value={formik.values.comments}
                            onChange={formik.handleChange}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'nowrap',
                            }}
                        >
                            <DatePicker 
                                label="Start Date"
                                value={formik.values.start_date}
                                onChange={(value) => {
                                    formik.setFieldValue('start_date', dayjs(value));
                                    }}
                            />

                            <DatePicker 
                                label="Due Date"
                                value={formik.values.end_date}
                                onChange={(value) => {
                                    formik.setFieldValue('end_date', dayjs(value));
                                    }}
                            />
                        </Box>
                        {formik.errors.end_date ? <Typography sx={{color:"red"}}>Due Date cannot be earlier than Start Date</Typography> : null}

                        <InputLabel id="team-member-label">Resonsible Team Member</InputLabel>
                        <Select
                            fullWidth
                            labelId="team-member-label"
                            id="user_id"
                            name="user_id"
                            value={formik.values.user_id}
                            onChange={formik.handleChange}
                        >
                            {teamOptions}
                        </Select>

                        <InputLabel id="status-label">status</InputLabel>
                        <Select
                            fullWidth
                            labelId="status-label"
                            id="status"
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value='open'>Open</MenuItem>
                            <MenuItem value='complete'>Complete</MenuItem>
                            <MenuItem value='waiver_requested'>Waiver Requested</MenuItem>
                            <MenuItem value='not_applicable'>Not Applicable</MenuItem>
                            <MenuItem value='incomplete'>Incomplete</MenuItem>
                        </Select>

                        <Stack 
                            spacing={2} 
                            direction="row"
                        >
                            <Button 
                                type="submit" 
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {saveButtonText}
                            </Button>
                            <Button 
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => {
                                    handleClose();
                                    formik.resetForm({
                                        values: formik.initialValues
                                    })
                                }}
                            >
                                Close
                            </Button>
                            {task && <Button 
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleDelete}
                            >
                                Delete Task
                            </Button>}
                        </Stack>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default TaskModal