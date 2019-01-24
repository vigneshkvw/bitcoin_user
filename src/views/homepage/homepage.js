import React, { Component } from 'react';
import Header from '../header';
import SideBar from '../sidebar';
import url from '../url';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { BrowserRouter as Router, Switch, Route, Link, NavLink, HashRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();
var cook=""
export default class homepage extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
        this.handleClick = this.handleClick.bind(this);
        window.postMessage('renderTable', '*');
        // this.updateState = this.updateState.bind(this);
    }

    handleClick(e) {        
        if(cook=="" || cook==undefined ||cook==null){
            document.location = "/#/login"
        }else{
            axios.get(url + "/addcart/"+e+"/?_id="+cook).then(res => {
                const k = 1;
               if(res.data.result=="success"){
                   alert("added to cart")
               }
            }, err => {
                document.location = "/#/"
            })
        }
      }
    componentDidMount() {
        cook=cookies.get("_id")
        axios.get(url + "/listproduct").then(res => {
            const k = 1;
           
            this.setState({ data: res.data.data });
            console.log(this.state.data)
        }, err => {
            document.location = "/#/"
        })
    }

    render() {
        return (
            <div>
            <Header/>
           
        

<div className="container" style={{marginTop:"55px"}}>
    <h3 className="h3">Product List </h3>
    <div className="row" style={{paddingBottom:"50px"}}>
    {this.state.data.map((post) =>
    <div className="col-md-3 col-sm-6" >
            <div className="product-grid">
                <div className="product-image">
                        <img className="pic-1" src={post.image} style={{height:"300px"}}/>
                        <img className="pic-2" src={post.image} style={{height:"300px"}}/>
                   
                    <ul className="social">
                       
                        <li><i className="fa fa-shopping-cart"  onClick={() => this.handleClick(post._id)}></i></li>
                    </ul>
                    <span className="product-new-label">Sale</span>
                </div>
            
                <div className="product-content">
                    <h3 className="title">{post.name}</h3>
                    <span className="add-to-cart" onClick={() => this.handleClick(post._id)} style={{cursor:"pointer"}}> Add To Cart</span>
                </div>
            </div>
        </div>
          )}
        </div>
        
        
    </div>
            </div>
        )
    }
}