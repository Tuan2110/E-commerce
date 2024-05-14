import { Alert, Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, loginWithGoogle } from '../../state/auth/Action';
import GoogleIcon from '@mui/icons-material/Google'; // Importing Google icon from MUI icons
import FacebookIcon from '@mui/icons-material/Facebook'; // Importing Facebook icon from MUI icons
import { API_BASE } from '../../config/apiConfig';

export const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {auth} = useSelector(store => store);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (auth.error) {
            setShowAlert(true);
        }
    }, [auth.error]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        dispatch(login(data));
    }
    const handleGoogleLogin = () => {
        window.location.href = `${API_BASE}/oauth2/authorization/google`;
    }

    const handleFacebookLogin = () => {
        window.location.href = `${API_BASE}/oauth2/authorization/facebook`;
    }
    
    return (
        <div>
            {showAlert && (
                <Alert className='mb-10' severity="error" onClose={() => setShowAlert(false)}>
                    {auth.error}
                </Alert>
            )}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="password"
                            type='password'
                            name="password"
                            label="Password"
                            fullWidth
                            autoComplete="password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button className='bg-gradient-to-r from-primary to-secondary w-full'
                            type='submit' variant='contained'
                            size='large' sx={{padding : '.8rem 0',bgcolor : '#52d45d', ":hover": { bgcolor: '#4ac152' }}}
                        >
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            className='w-full'
                            sx={{ bgcolor: '#DB4437', '&:hover': { bgcolor: '#BA3B34' } }}
                            startIcon={<GoogleIcon />}
                            onClick={handleGoogleLogin}
                        >
                            Google
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            className='w-full'
                            sx={{ bgcolor: '#4267B2', '&:hover': { bgcolor: '#365899' } }}
                            startIcon={<FacebookIcon />}
                            onClick={handleFacebookLogin}
                        >
                            Facebook
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <div className='flex justify-center flex-col items-center'>
                <div className='py-3 flex items-center'>
                    <p>If you don't have account?</p>
                    <Button onClick={()=>navigate("/register")} className='ml-5' size='small'>Register</Button>
                </div>
            </div>
        </div>
    );
}
