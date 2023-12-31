import { useNavigate } from 'react-router-dom';
import { MenuItem } from '@mui/material';

function NavBar({user, handleLogout, handleClose, setProject}) {
    const navigate = useNavigate();

    return (
        <>
            <MenuItem 
                onClick={() => {
                    handleClose();
                    navigate(`/home`)
                    setProject("");
                }}
            >
                Home
            </MenuItem>
            <MenuItem 
                onClick={() => {
                    handleClose();
                    navigate(`/account`);
                }}
            >
                Account
            </MenuItem>
            <MenuItem 
                onClick={() => {
                    handleClose();
                    navigate("/templates");
                }} 
            >
                Templates
            </MenuItem>
            <MenuItem 
                onClick={() => {
                    handleClose();
                    navigate("/login");
                    handleLogout();
                }} 
            >
                Log Out
            </MenuItem>
        </>
    )
}

export default NavBar

