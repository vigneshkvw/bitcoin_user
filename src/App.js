import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink, HashRouter, browserHistory } from 'react-router-dom';
import Login from './views/login/login';
import List from './views/list/list';
import Addproduct from './views/list/addproduct';
import Register from './views/register/register';
import Homepage from './views/homepage/homepage';
import Mycart from './views/homepage/mycart';
class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="wrapper theme-5-active">
        <Route exact path='/' component={Homepage} />
        <Route exact path='/cart' component={Mycart} />
            <Route exact path='/login' component={Login} />
          <Route exact path='/list' component={List} />
          <Route exact path='/addproduct' component={Addproduct} />
          <Route exact path='/register' component={Register} />
      </div >
      </HashRouter>
    );
  }
}

export default App;
