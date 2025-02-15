var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router  = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var h = require('./helpers');

// ___________________________________________________

/*
  App
*/

var App = React.createClass({
  getInitialState : function() {
    return {
      fishes: {},
      order : {}
    }
  },
  addFish : function(fish) {
     var timestamp = (new Date()).getTime();
     //update the state object
     this.state.fishes['fish-' + timestamp] = fish;
     //Set the state
     this.setState({ fishes : this.state.fishes });
  },
  render : function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order/>
        <Inventory addFish={this.addFish} />
      </div>
    )
  }
});

/*
 Add Fish Form
 <AddFishForm/>
*/

var AddFishForm = React.createClass({

  createFish : function (event) {
    // stop the form from submitting
    event.preventDefault();
    // Take data from form & create an object
  var fish = {
    name : this.refs.name.value,
    price : this.refs.price.value,
    status : this.refs.status.value,
    desc : this.refs.desc.value,
    image : this.refs.image.value
  }
    // Add the fish to the App state
    this.props.addFish;
  },
  render : function() {
     return (
      <div>
        <form action="" className="fish-edit" ref='fishForm' onSubmit={this.createFish}>
          <input type="text" ref="name" placeholder="Fish Name"/>
          <input type="text" ref="price" placeholder="Fish Price"/>
          <select name="" id="" ref="status">
            <option value="available">FRESH!</option>
            <option value="unavailable">SOLD OUT!</option>
          </select>
          <textarea name="" id="" cols="30" rows="10" type="text" ref="desc" placeholder="Desc"></textarea>
          <input type="text" ref="image" placeholder="URL to image"/>
          <button type="submit">+ Add Item</button>
        </form>
      </div>
      )
  }
})

/*
  Header
  <Header/>
*/
var Header = React.createClass({
  render : function() {
    return (
      <header className="top">
        <h1>Catch
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
          Day</h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>
      </header>
    )
  }
})

/*
  Order
  <Order/>
*/
var Order = React.createClass({
  render : function() {
    return (
      <p>Order</p>
    )
  }
})

/*
  Inventory
  <Inventory/>
*/
var Inventory = React.createClass({
  render : function() {
    return (
      <div>
        <p>Inventory</p>
        <AddFishForm addFish={this.addFish} />
      </div>
    )
  }
})

// ___________________________________________________
/*
  StorePicker
  This will let us make <StorePicker/>
*/

var StorePicker = React.createClass({
  mixins : [History],
  goToStore : function(event) {
    event.preventDefault();
    // get the data from the input
    var storeId = this.refs.storeId.value;
    this.history.pushState(null, '/store/' + storeId);
  },
  render : function() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input type="text" ref="storeId" defaultValue={h.getFunName()} required />
        <input type="Submit" />
      </form>
    )
  }

});

/*
  Not Found
*/

var NotFound = React.createClass({
  render : function() {
    return <h1>Not Found!</h1>
  }
});

/*
  Routes
*/

var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={StorePicker}/>
    <Route path="/store/:storeId" component={App}/>
    <Route path="*" component={NotFound}/>
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));
