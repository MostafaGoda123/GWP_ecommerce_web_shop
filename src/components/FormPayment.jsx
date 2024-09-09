import React from 'react'
import FormReview from './FormReview'
import { loadStripe } from '@stripe/stripe-js'
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js'
import { Button, Divider, Typography } from '@mui/material'


const FormPayment = ({shippingData , checkoutToken , backStep , nextStep , handleCaptureCheckout}) => {

   let stripePromise = loadStripe(process.env.REACT_APP_stripe_PUBLIC_KEY);
   async function handleSubmit(event , elements , stripe) {
      event.preventDefault();
      if (!stripe || !elements) return;
      let cardElement = elements.getElement(CardElement)
      let { error , paymentMethod } = await stripe.createPaymentMethod({ type:'card' , card : cardElement });
      if (error) {
         console.log(error);
      }else{
         let orderData = {
            line_items : checkoutToken?.line_items,
            customer :{ firstname:shippingData.firstName, lastname:shippingData.lastName, email:shippingData.email },
            shipping :{ 
               name:'Primary' , 
               street:shippingData.address1 ,
               town_city:shippingData.city,
               county_state:shippingData.shippingSubdivision,
               postal_zip_code:shippingData.zip,
               country:shippingData.shippingCountry
            },
            fulfillment : { shipping_method: shippingData.shippingOption },
            payment: {
               gateway:'stripe',
               stripe :{payment_method_id : paymentMethod.id}
            }
         }
         handleCaptureCheckout(checkoutToken?.id , orderData);
         nextStep();
      }
   }

   return (
      <>
         <FormReview checkoutToken={checkoutToken} />
         <Divider />
         <Typography variant='h6' gutterBottom my={'20px'}>Payment Method</Typography>
         <Elements stripe={stripePromise}>
            <ElementsConsumer>
               {({elements,stripe}) => (
                  <form onSubmit={(e) => handleSubmit(e,elements,stripe)}>
                     <CardElement />
                     <br /><br />
                     <div className="flex justify-between items-center mt-5">
                        <Button variant='outlined' onClick={() => backStep()}>Back</Button>
                        <Button type='submit' variant='contained' color='primary' disabled={!stripe}>Pay {checkoutToken?.subtotal?.formatted_with_symbol}</Button>
                     </div>
                  </form>
               )}
            </ElementsConsumer>
         </Elements>
      </>
   )
}

export default FormPayment
