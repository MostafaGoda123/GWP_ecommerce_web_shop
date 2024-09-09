import React from 'react'
import ProductCard from './ProductCard'

const Products = ({ products , handleAddToCart }) => {

   // let products = [
   //    { id:1 , name:'laptop' , description:'Book on grid systems' , price:'$600' ,image:'https://th.bing.com/th/id/OIP.ENFiI2expgUp0QSSpOaWQwHaF5?w=204&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'},
   //    { id:2 , name:'laptop' , description:'very good' , price:'$600' ,image:'https://th.bing.com/th/id/OIP.ENFiI2expgUp0QSSpOaWQwHaF5?w=204&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'},
   //    { id:3 , name:'laptop' , description:'Book on grid systems' , price:'$600' ,image:'https://th.bing.com/th/id/OIP.ENFiI2expgUp0QSSpOaWQwHaF5?w=204&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'},
   //    { id:4 , name:'laptop' , description:'very good' , price:'$600' ,image:'https://th.bing.com/th/id/OIP.ENFiI2expgUp0QSSpOaWQwHaF5?w=204&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'},
   //    { id:5 , name:'laptop' , description:'Book on grid systems' , price:'$600' ,image:'https://th.bing.com/th/id/OIP.ENFiI2expgUp0QSSpOaWQwHaF5?w=204&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'},
   //    { id:6 , name:'laptop' , description:'very good' , price:'$600' ,image:'https://th.bing.com/th/id/OIP.ENFiI2expgUp0QSSpOaWQwHaF5?w=204&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'},
   //    { id:7 , name:'laptop' , description:'Book on grid systems' , price:'$600' ,image:'https://th.bing.com/th/id/OIP.ENFiI2expgUp0QSSpOaWQwHaF5?w=204&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'},
   //    { id:8 , name:'laptop' , description:'very good' , price:'$600' ,image:'https://th.bing.com/th/id/OIP.ENFiI2expgUp0QSSpOaWQwHaF5?w=204&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'},
   // ]

   return (
      <main className='px-4 sm:px-6 md:px-8 lg:px-10'
      style={{display:'grid', gridTemplateColumns:`repeat(auto-fill,minmax(270px,1fr))` , gap:'30px'}}>
            {products.map((product) => {
               return <ProductCard key={product.id} product={product} handleAddToCart={handleAddToCart} />
            })}
      </main>
   )
}

export default Products
