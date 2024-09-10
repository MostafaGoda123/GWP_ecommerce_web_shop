import React from 'react'
import { List, ListItem, ListItemText, Typography } from '@mui/material'

const FormReview = ({checkoutToken}) => {
   // console.log(checkoutToken?.line_items);
   
   return (
      <>
         <Typography variant='h6'>Order Summary</Typography>
         <List disablePadding>
            {checkoutToken?.line_items.map((item) => (
               <ListItem style={{padding:'5px 0'}} key={item.id}>
                  <ListItemText primary={item.name} secondary={`Quantity : ${item.quantity}`} />
                  <Typography variant='body2'>{item.line_total.formatted_with_symbol}</Typography>
               </ListItem>
            ))}
            <ListItem style={{padding:'5px 0'}}>
               {/* <ListItemText primary={'Total : '} /> */}
               <Typography variant='subtitle1' fontWeight={'bold'}><span className='font-normal'>Total : </span>{checkoutToken?.subtotal?.formatted_with_symbol}</Typography>
            </ListItem>
         </List>
      </>
   )
}

export default FormReview
