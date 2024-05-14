import { Alert, Button, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, register } from '../../state/auth/Action';
import * as yup from "yup";
import { useFormik } from 'formik';

export const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');
    const {auth} = useSelector(store => store);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(()=>{
        if(auth.response){
            setShowAlert(true);
        }
    },[auth.response])

    const validationSchema = yup.object().shape({
        first_name: yup.string().required('First name is required'),
        last_name: yup.string().required('Last name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        confirm_password: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });
    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const data = { ...values, facebook_account_id: 0, google_account_id: 0, role_id: 1 };
            dispatch(register(data));
        },
    });

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const formData = new FormData(e.target);
    //     const data = Object.fromEntries(formData);
    //     data['facebook_account_id'] = 0
    //     data['google_account_id'] = 0
    //     data['role_id'] = 1
    //     dispatch(register(data))
    //     navigate('/login')
    // }
    return (
        <div>
            {showAlert && (
                <Alert className='mb-10' severity="success" onClose={() => setShowAlert(false)}>
                    {auth.response.data.message}
                    .If verified go to<Button onClick={()=>navigate("/login")} className='bg-[#9155FD]'>Login</Button>
                </Alert>
            )}
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="first_name"
                            label="First name"
                            onChange={formik.handleChange}
                            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                            helperText={formik.touched.first_name && formik.errors.first_name}
                            fullWidth
                            autoComplete="given-name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="last_name"
                            onChange={formik.handleChange}
                            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                            helperText={formik.touched.last_name && formik.errors.last_name}
                            label="Last name"
                            fullWidth
                            autoComplete="given-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="email"
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
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
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            fullWidth
                            autoComplete="password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="confirmPassword"
                            type='password'
                            name="confirm_password"
                            onChange={formik.handleChange}
                            error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                            helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                            label="Confirm Password"
                            fullWidth
                            autoComplete="password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button className='bg-gradient-to-r from-primary to-secondary w-full'
                            type='submit' variant='contained'
                            size='large' sx={{padding : '.8rem 0',bgcolor : '#52d45d', ":hover": { bgcolor: '#4ac152' }}}
                        >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <div className='flex justify-center flex-col items-center'>
                <div className='py-3 flex items-center'>
                    <p>If you have already account ?</p>
                    <Button onClick={()=>navigate("/login")} className='ml-5' size='small'>Login</Button>
                </div>
            </div>
        </div>
    )
}
