import { Button, Card, Stack, Typography } from '@mui/material';
import React from 'react'

const CartItem = ({item,handleUpdateCart,handleRemoveFromCart}) => {
   // console.log(item);

   return (
      <Card>
         <img src={item.image.url} alt={item.name} />
         <div className="bg-neutral-100 p-3 flex flex-col gap-3">
            <div className='flex justify-between items-center'>
               <Typography variant='h4'>{item.name}</Typography>
               <Typography variant='h4'>{item.price.formatted_with_symbol}</Typography>
            </div>
            <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
               <Button type='button' onClick={()=>handleUpdateCart(item.id,item.quantity-1)} >-</Button>
               <Typography variant='h5'>{item.quantity}</Typography>
               <Button type='button' onClick={()=>handleUpdateCart(item.id,item.quantity+1)} >+</Button>
               <Button type='button' variant='contained' color='error' onClick={()=>handleRemoveFromCart(item.id)} >Remove</Button>
            </Stack>
         </div>
      </Card>
   )
}

export default CartItem
