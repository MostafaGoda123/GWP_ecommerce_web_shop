import React from 'react'
import logo from '../images/commerce.png'
import { FaShoppingCart } from 'react-icons/fa'
import { Box, Stack } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

const Navbar = ({ total_items }) => {

   let location = useLocation()

   return (
      <nav className='z-50 px-4 sm:px-6 md:px-8 lg:px-10 flex justify-between items-center h-[10vh] border-b cursor-pointer bg-white fixed top-0 left-0 w-full'>
         <Box component={Link} to={'/'} sx={{font:"bold"}} className='flex gap-2 items-center text-2xl'>
            <img src={logo} alt="logo" className='w-8'/>
            <p>commerce.js</p>
         </Box>
         {location.pathname!=='/checkout' && location.pathname!=='/cart' &&
         <Stack component={Link} to={'/cart'} className=" relative hover:bg-neutral-200 duration-300 rounded-full p-2">
            <FaShoppingCart className='text-3xl' />
            <p className='absolute top-[0px] right-[0px] w-[20px] h-[20px] flex justify-center items-center bg-red-600  rounded-full text-lg text-white'>{total_items}</p>
         </Stack>}
      </nav>
   )
}

export default Navbar
