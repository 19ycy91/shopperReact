import React from 'react';
import './Nav.css';

console.log(this);
const Nav=({activeTab, onTabChange, items, price}) => (
    
    <nav className = "App-nav">
        <ul>
            <li className = {`App-nav-item ${activeTab === 0 && 'selected'}`}>
                <a  onClick={() => onTabChange(0)}>Items</a>
            </li>
            <li className = {`App-nav-item ${activeTab === 1 && 'selected'}`}>
                <a  onClick = {() => onTabChange(1)}>Cart</a>
            </li>
            <div className = "cartIcon" onClick = {() => onTabChange(1)}>
            <i className="fas fa-shopping-cart"></i> {items} items (${(price).toFixed(2)})
            </div>
        </ul>
    </nav>
);

export default Nav;