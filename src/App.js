import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import Products from './components/Products';
import { commerce } from './library/Commerce';
import Cart from './components/Cart';
import { Route, Routes } from 'react-router-dom';
import Checkout from './components/Checkout';

const App = () => {

  let [ products , setProducts ] = useState([]);
  let [ cart , setCart ] = useState({});
  let [ order , setOrder ] = useState({});
  let [ errorMessage , setErrorMessage ] = useState('');

  const fetchProducts = async () => {
    let { data } = await commerce.products.list();
    setProducts(data);
  }
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }
  const handleAddToCart = async (productId , quantity) => {
    let { cart } = await commerce.cart.add(productId , quantity);
    setCart(cart)
  }
  const handleUpdateCart = async (productId , quantity) => {
    let { cart } = await commerce.cart.update(productId , {quantity});
    setCart(cart)
  }
  const handleRemoveFromCart = async (productId) => {
    let { cart } = await commerce.cart.remove(productId);
    setCart(cart)
  }
  const handleEmptyCart = async () => {
    let { cart } = await commerce.cart.empty();
    setCart(cart)
  }
  async function refreshCart() {
    let newCart = await commerce.cart.refresh();
    setCart(newCart); 
  }
  async function handleCaptureCheckout(checkoutTokenId , newOrder) {
    try {
      const inComingOrder = await commerce.checkout.capture(checkoutTokenId,newOrder);
      setOrder(inComingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])
  useEffect(() => {
    fetchCart()
  }, [cart])


  return (
    <div className='bg-neutral-100 pt-[15vh] pb-[5vh]'>
      <Navbar total_items={cart?.total_items} />
      <Routes>
        <Route path='/' element={<Products products={products} handleAddToCart={handleAddToCart} />} />
        <Route path='/cart' element={<Cart cart={ cart } handleUpdateCart={handleUpdateCart} handleRemoveFromCart={handleRemoveFromCart} handleEmptyCart={handleEmptyCart} />} />
        <Route path='/checkout' element={<Checkout cart={cart} order={order} handleCaptureCheckout={handleCaptureCheckout} errorMessage={errorMessage} refreshCart={refreshCart} />} />
        </Routes>
    </div>
  )
}

export default App
