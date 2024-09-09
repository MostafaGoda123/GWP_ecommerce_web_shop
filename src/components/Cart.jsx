import { Button, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import CartItem from './CartItem'
import { Link } from 'react-router-dom'

const Cart = ({cart,handleUpdateCart,handleRemoveFromCart,handleEmptyCart}) => {
   if ( !cart?.line_items ) return <Typography className='flex justify-center text-3xl'>Loading...</Typography>
   // console.log(cart);
   
   return (
      <Container>
         <Typography variant='h4' gutterBottom>Your Shopping Cart</Typography>
         {cart?.line_items.length === 0 ?
            <Typography textAlign={'center'}>There isn't any item, <Link to={'/'} className='text-blue-600'>Start adding some.</Link></Typography>
         :
         <>
            <Grid container spacing={3}>
               {cart?.line_items.map((item) => {
                  return <Grid item xs={12} sm={6} md={4} key={item.id} >
                     <CartItem item={item} handleUpdateCart={handleUpdateCart} handleRemoveFromCart={handleRemoveFromCart} />
                  </Grid>
               })}
            </Grid>
            <div className={`flex justify-between items-center mt-10 sm:flex-row flex-col gap-3`}>
               <Typography variant='h5' >
                  SubTotal : {cart.subtotal.formatted_with_symbol}
               </Typography>
               <div className='flex gap-3'>
                  <Button size='large' type='button' variant='contained' color='error' onClick={()=>handleEmptyCart()}>Empty Cart</Button>
                  <Button component={Link} to={'/checkout'} size='large' type='button' variant='contained' >CheckOut</Button>
               </div>
            </div>
         </>
         }
      </Container>
   )
}

export default Cart

