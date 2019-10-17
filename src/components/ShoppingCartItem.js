import React, {useContext} from 'react';

//Context
import CartContext from "../contexts/CartContext.js";

const Item = props => {
   const {removeItem} = useContext(CartContext);

	return (
		<div className="shopping-cart_item">
			<img src={props.image} alt={`${props.title} book`} />


			<div>
				<h1 className="shopping-cart__title">{props.title}</h1>
				<p>$ {props.price}</p>
				<button onClick={event => {removeItem(props.id)}}>Remove from cart</button>
            <p>Quantity: {props.quantity}</p>
			</div>
		</div>
	);
};

export default Item;
