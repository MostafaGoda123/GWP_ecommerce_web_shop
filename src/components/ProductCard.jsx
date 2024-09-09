import React from 'react'
import { MdOutlineAddShoppingCart } from 'react-icons/md'

const ProductCard = ({ product , handleAddToCart }) => {
   // console.log(product);
   
   return (
      <div className='bg-white rounded-lg overflow-hidden shadow-md '>
         <img src={product.image.url} alt={product.name} className='w-full' />
         <div className='p-4 bg-green-50'>
            <ul className='flex justify-between items-center mb-3 text-xl font-semibold'>
               <li>{product.name}</li>
               <li>{product.price.formatted_with_symbol}</li>
            </ul>
            <p dangerouslySetInnerHTML={{ __html:product.description }} className='text-neutral-600 text-lg mb-5' />
            <MdOutlineAddShoppingCart onClick={() => handleAddToCart(product.id , 1)} className='text-5xl ms-auto cursor-pointer text-neutral-600 hover:text-black hover:bg-green-200 duration-300  p-2 rounded-full' />
         </div>
      </div>
   )
}

export default ProductCard
