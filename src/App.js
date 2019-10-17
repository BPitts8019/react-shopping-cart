import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Contexts
import ProductContext from "./contexts/ProductContext.js";
import CartContext from "./contexts/CartContext.js";

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	const addItem = newItem => {
      //look for item in cart
      let newCart = [...cart];
      let index = newCart.findIndex(item => item.id === newItem.id);
      
      //Did we find the item in the cart?
      if (index === -1) {
         //No; Add the new item with a quantity of 1
         newCart = newCart.concat({
            ...newItem,
            quantity: 1
         });
      } else {
         //yes; Add 1 to existing item's quantity
         newCart[index].quantity++;
      }

      //update the cart
      setCart(newCart);
   };

   const removeItem = id => {
      //find first instance of item to remove
      const index = cart.findIndex(item => item.id === id);

      if (index === -1) {
         //we should not get here, but just in case
         console.error(Error(`There was a problem trying to delete Item ${id}`));
         return;
      }

      //build new cart
      const newCart = [
         ...cart.slice(0, index),
         ...cart.slice(index+1)
      ];
      
      setCart(newCart);
   };

	return (
      <ProductContext.Provider value={{products, addItem}}>
      <CartContext.Provider value={{cart, removeItem}}>
         <div className="App">
            <Navigation />

            {/* Routes */}
            <Route
               exact
               path="/"
               component={Products}
            />

            <Route
               path="/cart"
               component={ShoppingCart}
            />
         </div>
      </CartContext.Provider>
      </ProductContext.Provider>
	);
}

export default App;
