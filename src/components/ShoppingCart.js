import React, {useContext} from 'react';

// Context
import CartContext from "../contexts/CartContext.js";

// Components
import Item from './ShoppingCartItem';

const ShoppingCart = () => {
   const {cart, emptyCart} = useContext(CartContext);
	const getCartTotal = () => {
		return cart.reduce((acc, value) => {
			return acc + (value.price * value.quantity);
		}, 0).toFixed(2);
   };
   const renderEmptyCart = () => {
      if (cart.length > 0) {
         return (
            <div className="shopping-cart__empty">
               <button onClick={emptyCart}>Empty Cart</button>
            </div>
         );
      }

      return null;
   };

	return (
		<div className="shopping-cart">
			{cart.map(item => (
				<Item key={item.id} {...item} />
			))}

         {renderEmptyCart()}
         
			<div className="shopping-cart__checkout">
				<p>Total: ${getCartTotal()}</p>
				<button>Checkout</button>
			</div>
		</div>
	);
};

export default ShoppingCart;
