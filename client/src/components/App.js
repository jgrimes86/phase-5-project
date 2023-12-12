import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import Banner from "./Banner";

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [signup, setSignup] = useState(false);
    const [project, setProject] = useState("");
    const [roles, setRoles] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/check_session')
        .then((r) => {
            if (r.ok) {
                r.json().then((user) => {setUser(user)});
            }
            else {
                r.json().then(() => navigate('/login'))
            }
          });
    }, [])


    function handleLogout() {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then((r) => {
            if (r.ok) {setUser(null); setSignup(false)}
        })
    }

    const context = {
        user,
        setUser,
        signup,
        setSignup,
        project,
        setProject,
        roles,
        setRoles,
        users,
        setUsers,
    }


    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box>
                {user && (location.pathname !== '/login') && <Banner user={user} handleLogout={handleLogout}/>}
                {/* {user && (location.pathname !== '/login') && <NavBar userId={user.id} handleLogout={handleLogout} />} */}
                <Outlet context={context} />
            </Box>
        </LocalizationProvider>
    )
}

export default App;