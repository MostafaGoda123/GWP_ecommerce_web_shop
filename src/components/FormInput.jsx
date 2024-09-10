import { Grid, TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'


const FormInput = ({ name , label }) => {

   let { control } = useFormContext()

   return (
      <Grid item xs={12} sm={6} >
         <Controller 
            name={name}
            control={control}
            render={({ field }) => (
               <TextField
                  {...field}
                  fullWidth
                  label={label}
                  required
               />
            )}
         />
      </Grid>
   )
}

export default FormInput
