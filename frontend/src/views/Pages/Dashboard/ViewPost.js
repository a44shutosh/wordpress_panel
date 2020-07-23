import React, { Component } from 'react';


import {Container, ListGroup, ListGroupItem, UncontrolledCollapse, Nav, NavItem, NavLink,  Row, Col, Button, Input, InputGroupAddon, InputGroup, InputGroupText} from 'reactstrap';
import utility from '../../../utils/utility';
import apiConstants from "../../../constants/apiConstants";
import httpRequest from "../../../utils/httpRequest";
import '../../../../public/css/login.css';
import ReactTable from "react-table";
import "react-table/react-table.css";

class ViewPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      classUserName: '',
      classPassName: '',
      slot: "",
      categoryClass:"hidden",
      tagsClass:"hidden",
      categories:null,
      tags:null,
      offset : 0,
      postData:null
    }
    this.googleResponse = this.googleResponse.bind(this);
  }

  googleResponse(response) {
    this.sendGoogleDetails(response);

  }

  sendGoogleDetails(response) {
    const { sendGoogleAccessToken } = this.props;
    const payload = { "accessToken": response.socialToken };
    sendGoogleAccessToken(payload);
  }
  componentWillReceiveProps(nextProps) {
    const { environment, getWordPressPosts, saveCategorySelected, saveTagSelected } = nextProps;
   

  }

  getPostData() {

    let that = this;
   
    const response = httpRequest.call(
      "POST",
      apiConstants.NEO_SP_API_PATH + "/v1/wordpress/getPostById",
      {},
      {"postId":this.props.environment.wordpressViewPost},
      "",
      function (error, result, body) {
        console.log("result data", body.response);
        that.setState({postData: body.response.body})
        return body.response;
    }
    );
    return response;
    

  }
  
  
  componentDidMount() {
    const { environment, redirectTo } = this.props;
   
    this.getPostData();

  }
  


 

  render() {

    const {
      classUserName,
      classPassName
    } = this.state;

    const {
      environment
    } = this.props;

    console.log("WWWWWWWW", environment.wordpressPost)

    const {
      username
    } = environment;

    return (
      <div style={{width:"1300px"}}>
        <div className="animated fadeIn float-left">
            <div className="card">
              <div>
                <div className="card-header">
                  <div style={{textAlign:"center", paddingRight:"1400px"}}>
                    <i className="list-alt" style={{ color: "#ffffff" }}></i>
                    <h5 style={{textAalign: "center", fontSize:"20px", color:"#ffffff"}}>WordPress Panel</h5>
                  </div>
                </div>
                <div className="card-body">
                  {this.state.postData != null &&
                  <div>
                  <ListGroup flush>
                    <ListGroupItem disabled tag="a" ><p>Title</p><p>{this.state.postData.title}</p></ListGroupItem>
                    <ListGroupItem tag="a" ><p>Thumb Nail</p> <p>{this.state.postData.post_thumbnail.URL}</p> </ListGroupItem>
                    <ListGroupItem tag="a" ><p>Date</p> <p>{this.state.postData.modified}</p> </ListGroupItem>
                    <ListGroupItem tag="a" ><p>Content</p> <p>{this.state.postData.content}</p> </ListGroupItem>
                </ListGroup>
                </div>
                  }

                <div>

                </div>
              </div>
            </div>
          </div>
      </div>
      </div>
    );
  }
}

export default ViewPost;
