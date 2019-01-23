import React from 'react';
import Nav from './Nav';
import './App.css';
import ItemPage from './ItemPage';
import {items} from './static-data';
import CartPage from './CartPage';

class App extends React.Component {
  state = {
    activeTab: 0,
    cart: [ ],
    price: [ ]
  }

  handleTabChange = (index) => {
    this.setState({
      activeTab: index
    });

  }


  handleAddToCart = (item) => {
    this.setState({
      cart: [...this.state.cart, item.id],
      price: [...this.state.price, item.price]
    });
  }

  handleRemoveOne = (item) => {
    let index = this.state.cart.indexOf(item.id);
    this.setState({
      cart: [ 
        ...this.state.cart.slice(0,index),
        ...this.state.cart.slice(index+1)
      ],
      price: [ 
        ...this.state.price.slice(0,index),
        ...this.state.price.slice(index+1)
      ]
    })
  }

  
  renderContent() {
    //console.log(this.state.activeTap);
    switch(this.state.activeTab) {
      default:
      case 0: 
        return(
          <ItemPage 
            items = {items}
            onAddToCart={this.handleAddToCart}/>
        );
      case 1: 
        return this.renderCart();
    }
  }

  renderCart(){
    //count how many of each item is in the cart
    //this.state.cart is an array of all the ids of items
    let itemCounts = this.state.cart.reduce((itemCounts, itemId) => {
      // this.state.cart is list of all the items in it - list of item's id 
      
      // console.log("itemcounts", itemCounts);
      // console.log("itemid", itemId);
      // console.log("itemcounts[itemid]",itemCounts[itemId]);
      // console.log("|| expression",itemCounts[itemId] || 0);
      itemCounts[itemId] = itemCounts[itemId] || 0; 
      // initially if none set it to 0 but if there are other amounts already counted
      //set that as the true value and add one more below with ++ 


      itemCounts[itemId]++;
      return itemCounts;
      // keep returning this list of item id : count to itemcounts so it can build on it 
      //and add new ones

      //note that a compeltely new list is created/ renderCart is ran again
      // whenever new items are added / state changes
      //makes sense since whenever state changes - new render content is ran 

    }, {});

    // create an array of items
    let cartItems = Object.keys(itemCounts).map(itemId => {

      //find keys of itemcounts - which gives you all the item id
      //iterate through each item id 



      
      var item= items.find(item => 
        item.id === parseInt(itemId, 10)
      );
      // find the item by its id
      //items is the static data we imported 
      //using .find - find return the first item on items static data array
      // where the item's id from static data is equal to the itemid from itemcounts array


      // console.log(items);
      // console.log(item);
      // console.log(itemId);
      //console.log(...item);
      // console.log(itemCounts[itemId]);

      // create a new "item" and add the 'count' property
      // get that item, and open it up using ... and then add the count property
      // this count property itemCounts[itemId] was calculated from
      // the first part of renderCart() function utilizing reduce and short circuit 
      return {
        ...item, // this done on objects opens up the {} so a new property count can be added
                //// With arrays:
                //var a = [1, 2, 3];
                //varb=[a,4]; //=>[[1,2,3],4] var c = [...a, 4]; // => [1, 2, 3, 4]
                // With objects (technically not ES6)
                //var o1 = {a: 1, b: 2};
                //var o2 = {...o1, c: 3}; // => {a: 1, b: 2, c: 3} 
        count: itemCounts[itemId]
      }
    });

    return(
      <CartPage 
        items ={cartItems} 
        onAddOne = {this.handleAddToCart}
        onRemoveOne={this.handleRemoveOne} 
        price= {this.state.price.reduce((a, b) => a + b, 0)}/>

    );
  }

  render(){
    let {activeTab} = this.state;
    // console.log(this.state);
    
    return (
      <div className = "App">
        <Nav activeTab={activeTab} onTabChange={this.handleTabChange} items = {this.state.cart.length} price= {this.state.price.reduce((a, b) => a + b, 0)} />
        {/* <div>
          {this.state.cart.length !== 0 ? `${this.state.cart.length} items`:""} 
          
        </div> */}
        <main className = "App-content">
          {this.renderContent()}
        </main>

      </div>
    );
  }
}

export default App;


