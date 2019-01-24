import React, { Component } from 'react';
import Header from '../header';
import SideBar from '../sidebar';
import url from '../url';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


export default class addproduct extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            file:null,
            files: 'http://placehold.it/400x20&text=slide1',
            name:""
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleemailChange = this.handleemailChange.bind(this);
      
        window.postMessage('renderTable', '*');
        // this.updateState = this.updateState.bind(this);
    }
    handleemailChange(event) {
        this.setState({ username: event.target.value });
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
        this.setState({
            files: URL.createObjectURL(e.target.files[0])
          })
    }
    onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage',this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("/upload",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
    }
    componentDidMount() {
        axios.get(url + "/list_user").then(res => {
            const k = 1;
            for (let i = 0; i < res.data.data.length; i++) {
                res.data.data[i].sno = k + +i;
            }
            this.setState({ data: res.data.data });
        }, err => {
            document.location = "/#/"
        })
    }

    render() {
        return (
            <div>
            <Header/>
            <SideBar/>
           
           <div className="page-wrapper" style={{minHeight:"1000px",height:"100%"}}>
            <div className="container-fluid">
				<div className="row heading-bg">
					<div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
					  <h5 className="txt-dark"> List</h5>
					</div>
					<div className="col-lg-9 col-sm-8 col-md-8 col-xs-12">
					  <ol className="breadcrumb">
						<li className="active"><span>Add Product</span></li>
					  </ol>
					</div>
				</div>
			
                        <div className="col-lg-6 card-view" style={{paddingBottom:"20px",padding:"30px"}}>
                           
                        <div className="row">
									<div className="col-sm-12 col-xs-12">
										
										<div className="form-wrap">
												<form method="post" onSubmit={this.handleSubmit}>
												<div className="form-group">
													<label className="control-label mb-10" for="exampleInputEmail_2">Product Name</label>
														<input type="text" className="form-control" required="" id="exampleInputEmail_2" onChange={this.handleemailChange} placeholder="Enter Product Name"/>
												</div>
												<div className="form-group">
													<label className="pull-left control-label mb-10" for="exampleInputpwd_2">Upload</label>
													<div className="clearfix"></div>
                                                    <img src={this.state.files}alt="Product" class="img-responsive" style={{height:"250px",width:"250px",marginBottom:"20px"}} />
                                                    <input type="file" name="myImage" accept="image/x-png,image/gif,image/jpeg" onChange= {this.onChange} />
												</div>
												
												<div className="form-group">
													<div className="checkbox checkbox-primary pr-10 pull-left">
													</div>
													<div className="clearfix"></div>
												</div>
												<div className="form-group text-center">
														<button type="submit" className="btn btn-primary  btn-rounded" >sign in</button>
												</div>
											</form>
										</div>
									</div>	
								</div>
				</div>
				
			</div>	
			
        </div>
            </div>
        )
    }
}