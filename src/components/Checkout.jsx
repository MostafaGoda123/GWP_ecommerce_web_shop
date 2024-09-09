/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Divider, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FormAddress from './FormAddress'
import FormPayment from './FormPayment'
import { commerce } from '../library/Commerce'
import { Link , useNavigate } from 'react-router-dom';



const Checkout = ({ cart , order , handleCaptureCheckout , errorMessage }) => {

   const [activeStep, setActiveStep] = useState(0)
   const [shippingData, setShippingData] = useState({})
   const [checkoutToken, setCheckoutToken] = useState(null)
   let steps = ['Shipping address' , 'Payment details']
   const formConfirmation = () => order?.customer ? (
      <>
         <div>
            <Typography variant='h5'>Thanks for your purchase, {order?.customer?.firstname} {order?.customer?.lastname}</Typography>
            <br />
            <Divider />
            <br />
            <Typography variant='subtitle2'>Order ref : {order?.customer_reference}</Typography>
         </div>
         <br />
         <Button component={Link} to={'/'} variant='outlined' type='button'>Back to home</Button>
      </>
   ): (
      <>
         <div>
            <Typography variant='h5'>Thanks for your purchase</Typography>
            <br />
            <Divider />
            <br />
         </div>
         <br />
         <Button component={Link} to={'/'} variant='outlined' type='button'>Back to home</Button>
      </>
   )
   if (errorMessage) {
      <>
         <Typography variant='h5'>Error : {errorMessage}</Typography>
         <br />
         <Button component={Link} to={'/'} variant='outlined' type='button'>Back to home</Button>
      </>
   }
   let navigate = useNavigate('');
   useEffect(() => {
      const generateToken = async () => {
         try {
            let token = await commerce.checkout.generateToken(cart?.id, {type : "cart"});
            setCheckoutToken(token)
            // console.log(token);
            
         } catch (error) {
            navigate('/');
         }
      }
      generateToken();
   }, []);
   function next(data) {
      setShippingData(data);
      nextStep();
   }
   function backStep() { setActiveStep(activeStep - 1) };
   function nextStep() { setActiveStep(activeStep + 1) };

   return (
      <Box px={2}>
            <Paper className='sm:w-full md:w-[600px] ms-auto me-auto py-10 sm:px-10 px-3 flex flex-col gap-5'>
               <Typography variant='h4' textAlign={'center'}>Checkout</Typography>
               <Stepper activeStep={activeStep}>
                  {steps.map((step) => (
                     <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                     </Step>
                  ))}
               </Stepper>
               {activeStep === 0 && <FormAddress checkoutToken={checkoutToken} next={next} />}
               {activeStep === 1 && <FormPayment shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} handleCaptureCheckout={handleCaptureCheckout} nextStep={nextStep} />}
               {activeStep === 2 && formConfirmation() }
            </Paper>
      </Box>
   )
}

export default Checkout
