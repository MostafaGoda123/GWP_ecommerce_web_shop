/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import FormInput from './FormInput';
import { commerce } from '../library/Commerce';
import { Link } from 'react-router-dom';

const FormAddress = ({ checkoutToken , next }) => {

   let [shippingCountries, setShippingCountries] = useState([]);
   let [shippingCountry, setShippingCountry] = useState('');
   let [shippingSubdivisions, setShippingSubdivisions] = useState([]);
   let [shippingSubdivision, setShippingSubdivision] = useState('');
   let [shippingOptions, setShippingOptions] = useState([]);
   let [shippingOption, setShippingOption] = useState('');
   let methods = useForm();
   async function fetchShippingCountries(checkoutTokenId) {
      let { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
      countries = Object.entries(countries).map( (arr) => ({id:arr[0] , label:arr[1]}) );
      setShippingCountries(countries);      
      setShippingCountry(Object.keys(countries)[0]);      
   }
   async function fetchSubdivisions(countryCode) {
      let { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
      subdivisions = Object.entries(subdivisions).map( (arr) => ({id:arr[0] , label:arr[1]}) );
      setShippingSubdivisions(subdivisions);
      setShippingSubdivision(Object.keys(subdivisions)[0]);      
   }
   async function fetchOptions( checkoutTokenId , country , region = null ) {
      let options = await commerce.checkout.getShippingOptions(checkoutTokenId , {country , region});
      options = options.map((sO) => ({id:sO.id , label:`${sO.description} - ${sO.price.formatted_with_symbol}`}))
      setShippingOptions(options);
      setShippingOption(options[0].id);
   }
   useEffect(() => {
      fetchShippingCountries(checkoutToken?.id);
   }, [])
   useEffect(() => {
      if (shippingCountry) fetchSubdivisions(shippingCountry);
   }, [shippingCountry])
   useEffect(() => {
      if (shippingSubdivision) fetchOptions(checkoutToken?.id , shippingCountry , shippingSubdivision);
   }, [shippingSubdivision])

   // console.log(shippingOption);
   // console.log(shippingOptions);
   

   return (
      <>
         <Typography variant='h6' gutterBottom>Shipping Address</Typography>
         <FormProvider { ...methods }>
            <form onSubmit={( data )=> next({...data , shippingCountry , shippingSubdivision , shippingOption}) }>
               <Grid container spacing={3}>

                  <FormInput name="firstName" label='First Name' />
                  <FormInput name="lastName" label='Last Name' />
                  <FormInput name="address1" label='Address' />
                  <FormInput name="email" label='Email' />
                  <FormInput name="city" label='City' />
                  <FormInput name="zip" label='Zip / Postal Code' />
                  <Grid item xs={12} sm={6}>
                     <InputLabel>Shipping Country</InputLabel>
                     <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                        {shippingCountries.map((country) => (
                           <MenuItem key={country.id} value={country.id}>
                              {country.label}
                           </MenuItem>
                        ))}
                     </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <InputLabel>Shipping Subdivision</InputLabel>
                     <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                        {shippingSubdivisions.map((subdivision) => (
                           <MenuItem key={subdivision.id} value={subdivision.id}>
                              {subdivision.label}
                           </MenuItem>
                        ))}
                     </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <InputLabel>Shipping Option</InputLabel>
                     <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                        {shippingOptions.map((opt) => (
                           <MenuItem key={opt.id} value={opt.id}>
                              {opt.label}
                           </MenuItem>
                        ))}
                     </Select>
                  </Grid>

               </Grid>

               <div className="flex justify-between items-center mt-5">
                  <Button component={Link} to={'/cart'} variant='outlined'>Back to cart</Button>
                  <Button type='submit' variant='contained' color='primary'>Next</Button>
               </div>

            </form>
         </FormProvider>
      </>
   )
}

export default FormAddress
