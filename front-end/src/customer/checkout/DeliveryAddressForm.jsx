import { Box, Button, Grid, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch ,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../../state/order/Action'
import { AddressCard } from './AddressCard'
import { getUser } from '../../state/auth/Action'

export const DeliveryAddressForm = () => {
    const jwt = localStorage.getItem('jwt')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {auth} = useSelector(store => store);

    const handleSubmit=(e)=>{
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const address = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            streetAddress: data.get("address"),
            city: data.get("city"),
            state: data.get("state"),
            zipCode: data.get("zip"),
            mobile: data.get("phoneNumber"),
        };
        const orderData = {address,navigate}
        dispatch(createOrder(orderData))
        console.log(address);
    }
    useEffect(() => {
        dispatch(getUser(jwt))
    }, [])
    return (
        <div>
            <Grid container spacing={4}>
                <Grid xs={12} lg={5} className='border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll mt-8'>
                    <h1 className='mt-2 text-lg font-semibold'>Previous address</h1>
                    <div className='p-5 py-7 border-b cursor-pointer'>
                        {auth.user?.addresses.map((address,index)=><AddressCard key={index} address={address}/>)}
                    </div>
                </Grid>
                <Grid item xs={12} lg={7}>
                    <Box className="border rounded-md shadow-md p-5">
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                required
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                fullWidth
                                autoComplete="given-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                required
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                fullWidth
                                autoComplete="given-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required
                                id="address"
                                name="address"
                                label="Address"
                                fullWidth
                                autoComplete="shipping address"
                                multiline
                                rows={4}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                required
                                id="city"
                                name="city"
                                label="City"
                                fullWidth
                                autoComplete="shipping address-level2"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                required
                                id="state"
                                name="state"
                                label="State/Province/Region"
                                fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                required
                                id="zip"
                                name="zip"
                                label="Zip / Postal code"
                                fullWidth
                                autoComplete="shipping postal-code"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                required
                                id="phoneNumber"
                                name="phoneNumber"
                                label="Phone Number"
                                fullWidth
                                autoComplete="tel"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                sx={{ padding: ".9rem 2.5rem",bgcolor:'#fea928', ":hover": { bgcolor: '#fea930' }}}
                                size="large"
                                type="submit"
                                variant="contained"
                                >
                                Deliverd Here
                                </Button>
                            </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
