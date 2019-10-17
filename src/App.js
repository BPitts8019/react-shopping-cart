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

	const addItem = item => {
      if (cart.includes(item)) {
         console.log(`${item.title} is already in the cart`);
         return;
      }

      setCart([
         ...cart,
         item
      ]);
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
