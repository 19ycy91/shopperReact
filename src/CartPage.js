import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import './CartPage.css';

function CartPage({items, onAddOne, onRemoveOne,price}){
    console.log(price);
    console.log(price.length);
    return (
        <ul className = "CartPage-items">
            {items.map(item =>
                <li key={item.id} className = "CartPage-item">
                    <Item item={item}>
                        <div className = "CartItem-controls">
                            <button
                                className = "CartItem-removeOne"
                                onClick={()=> onRemoveOne(item)}>&ndash;</button>
                            <span className="CartItem-count">{item.count}</span>
                            <button
                                className = "CartItem-addOne"
                                onClick={ () => onAddOne(item)}>+</button>
                        </div>
                    
                    </Item>
                </li>
                )       
                }
            <div className = "noitemMessage">
                {items.length === 0 ?
                <h2>Your Cart is Empty <br></br>
                Why don't you put some stuff in it!</h2>
                :""
                }
            </div>
            {/* <div className = "TotalPrice">
                {price === 0 ?"":`Total:$${price}`} 
            </div> */}
        </ul>
    );
}

CartPage.propType = {
    items: PropTypes.array.isRequired,
    onAddOne: PropTypes.func.isRequired,
    onRemoveOne: PropTypes.func.isRequired
};

export default CartPage;