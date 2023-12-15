import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import { Box, Button } from '@mui/material';


function NotFound() {
    const navigate = useNavigate();
    const params = useParams();
    const {navError} = useOutletContext();

    return(
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: 500,
                ml: 'auto',
                mr: 'auto'
            }}
        >
            <h1>404 - {navError}</h1>
            <Button 
                variant="contained"
                onClick={()=>{navigate(`/user/home`)}}
            >
                Navigate to Home
            </Button>
        </Box>
    )
}

export default NotFound