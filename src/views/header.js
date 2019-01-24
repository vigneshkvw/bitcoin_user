import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink, HashRouter, browserHistory } from 'react-router-dom';
import $ from 'jquery';
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();
var cook=""
class header extends Component {
   
    componentDidMount() {
        $('.toggle-left-nav-btn inline-block ml-20 pull-left').on('click', function () {
            $('.wrapper theme-5-active ').toggleClass("wrapper theme-5-active slide-nav-toggle");
            var className = $('.fixed-sidebar-left').attr('class');
            console.log(className)
            if (className == 'wrapper theme-5-active  slide-nav-toggle') {
                $('.fixed-sidebar-left').css("display", 'none');
            } else {
                if ($(window).width() < 1200) {
                    $('.fixed-sidebar-left').css("display", '-webkit-box');
                } else {
                    $('.fixed-sidebar-left').css("display", 'table-cell');
                }
            }
        });

      cook=cookies.get("_id")
      console.log(cook)
    }
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            con_password: "",
            mobile_no: "",
            file: "http://carryyear.com:3034/img/user1.jpg"
        };
    }

    logout(event) {
        event.preventDefault();
        cookies.set('_id',"");
        document.location = '/';
    }
    render() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
               
                <div id="mobile_only_nav" className="mobile-only-nav pull-right">
                    <ul className="nav navbar-right top-nav pull-right">
                    {console.log(cook)}
                    {cook==undefined || cook==null || cook=="" ? 
                    <div style={{padding:"15px"}}>    
                    <NavLink to="/login">   <button  className="btn btn-primary  " style={{padding:"7px 16px",marginRight:"15px"}}>Sign in</button></NavLink>
                    <NavLink to="/register">
                     <button  className="btn btn-primary  " style={{padding:"7px 16px"}}>Register</button>
                     </NavLink>  </div>

       : 
        
  
                    <li className="dropdown auth-drp">
                            <a className="dropdown-toggle pr-0" data-toggle="dropdown"><img src="http://bestjquery.com/tutorial/product-grid/demo9/images/img-1.jpg" alt="user_auth" className="user-auth-img img-circle" style={{ cursor: "pointer" }}/><span className="user-online-status"></span></a>
                        <ul className="dropdown-menu user-auth-dropdown" data-dropdown-in="flipInX" data-dropdown-out="flipOutX">
                                <li style={{ cursor: "pointer" }}>
                                    <NavLink to="/cart"><i className="zmdi zmdi-account"></i><span>My Cart</span></NavLink>
                            </li>
                         
                           
                           
                            <li className="divider"></li>
                                <li style={{ cursor:"pointer"}}>
                                    <a onClick={this.logout}> <i className="zmdi zmdi-power"></i><span>Log Out</span></a>
                            </li>
                        </ul>
                    </li>
                       }
                    </ul>
                </div>

		</nav>
        );
    }
}

export default header;
