import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    let navigate = useNavigate();
    // get user and logout properties from the context
    const { user, logout } = useContext(AuthContext);

    // logout function that logout button can call 
    const onLogout = () => {
        // call logout function created in the context
        logout();
        navigate('/login');
    }
    
    console.log(user);

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant="h5" component="div">
                        <Link to="/" style={{textDecoration: "none", color: "white"}}>FunDive</Link>
                    </Typography>
                    <Box alignItems="right" sx={{flexGrow: 1, textAlign: "right"}}>
                        { user ? 
                            // if user exists give access to logout button
                            <>
                                <Button style={{textDecoration: "none", color: "white"}} onClick={onLogout}>Logout</Button>
                            </>
                        :
                            // if user doesn't exist give access to login and register links
                            <>
                                <Link to="/login" style={{textDecoration: "none", color: "white", marginRight: "10px"}}>Login</Link>
                                <Link to="/register" style={{textDecoration: "none", color: "white"}}>Register</Link>
                            </>    
                        }
                        
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
