import React, { Component } from 'react';


import {Container, UncontrolledCollapse, Nav, NavItem, NavLink,  Row, Col, Button, Input, InputGroupAddon, InputGroup, InputGroupText} from 'reactstrap';
import utility from '../../../utils/utility';
import apiConstants from "../../../constants/apiConstants";
import httpRequest from "../../../utils/httpRequest";
import underscore from 'underscore';
import backgroundLogin from '../../../../public/video/data.mp4';
import '../../../../public/css/login.css';
import ReactTable from "react-table";
import "react-table/react-table.css";

const styles = {
  paddingClass: { padding: '10px' },
  paddingLeftClass: { paddingLeft: '100px' },
  inputClass: { background: 'none', color: "#ffffff", opacity: "10", height: "50px" },
  ButtonClass: { background: 'none', color: "#ffffff", width: '100px', border: '2px solid #00FFFFFF' },
  fixedButton : {"position":"fixed","bottom":"10px","width":"100%","height":"50px","marginLeft":"405px","border":"0px solid #d6d6d6","zIndex":"99","padding":"0","textAlign":"center","background":"rgb(236, 145, 129)","color":"rgb(216, 55, 27)"}
};

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      classUserName: '',
      classPassName: '',
      errorLogin: undefined,
      slot: "",
      categoryClass:"hidden",
      tagsClass:"hidden",
      categories:null,
      tags:null,
      offset : 0
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
    if (utility.isEmpty(environment.wordpressCategory) === false) {
      getWordPressPosts({offset: this.state.offset, category: environment.wordpressCategory});
      saveCategorySelected();
    }
    if (utility.isEmpty(environment.wordpressTag) === false) {
      getWordPressPosts({offset: this.state.offset, tag: environment.wordpressTag});
      saveTagSelected();
    }

  }
  
  getCategory() {

    let that = this;
   
    const response = httpRequest.call(
      "GET",
      apiConstants.NEO_SP_API_PATH + "/v1/wordpress/getCategory",
      {},
      {},
      "",
      function (error, result, body) {
        that.setState({categories: body.response})
        return body.response;
    }
    );
    return response;
    

  }

  getTags() {

    let that = this;
   
    const response = httpRequest.call(
      "GET",
      apiConstants.NEO_SP_API_PATH + "/v1/wordpress//getTags",
      {},
      {},
      "",
      function (error, result, body) {
        that.setState({tags: body.response})
        return body.response;
    }
    );
    return response;

  }
  
  componentDidMount() {
    const { environment, redirectTo, getWordPressPosts } = this.props;
    const { token } = environment;
    if (token != null) {
      redirectTo('/dashboard');
    }
    this.getCategory();
    this.getTags();
    getWordPressPosts({offset: this.state.offset});

  }
  selectCategory(category){
    const{saveCategorySelected} = this.props;
    saveCategorySelected(category);
  }

  selectTag(tag){
    const{saveTagSelected} = this.props;
    saveTagSelected(tag)
  }

  renderCategories(){
    if(this.state.categories != null){
      const categorynavs =  this.state.categories.map((category)=>{   
        return <NavItem style={{cursor: "pointer"}} onClick={this.selectCategory.bind(this,category.name)}>
        {category.name}
    </NavItem>;   
    });
    return categorynavs;
    }else{
    return "";
    }
  }

  renderTags(){
    if(this.state.tags != null){
      const tagnavs =  this.state.tags.map((tag)=>{   
        return <NavItem style={{cursor: "pointer"}} onClick={this.selectTag.bind(this,tag.name)}>
        {tag.name}
    </NavItem>;   
    });
    return tagnavs;
    }else{
    return "";
    }
  }

  showHideCategories(){
   let categoryClass = this.state.categoryClass;
   if(categoryClass == ""){
     this.setState({categoryClass:"hidden"});
   }else{
    this.setState({categoryClass:""});
   }
  }

  showHideTags(){
    let tagsClass = this.state.tagsClass;
    if(tagsClass == ""){
      this.setState({tagsClass:"hidden"});
    }else{
     this.setState({tagsClass:""});
    }
   }

   viewPosts(postId){

   }

   getPreviousData(){

    const{getWordPressPosts} = this.props;
     let offset = this.state.offset;
     offset--;
     if (utility.isEmpty(environment.wordpressCategory) === false) {
      getWordPressPosts({offset: offset, category: environment.wordpressCategory});
    }
    else if (utility.isEmpty(environment.wordpressTag) === false) {
      getWordPressPosts({offset: offset, tag: environment.wordpressTag});
    }else{
     getWordPressPosts({offset: offset});
    }
     this.setState({offset: offset});

   }

   getNextData(){

    const{getWordPressPosts} = this.props;
     let offset = this.state.offset;
     offset++;
     if (utility.isEmpty(environment.wordpressCategory) === false) {
      getWordPressPosts({offset: offset, category: environment.wordpressCategory});
    }
    else if (utility.isEmpty(environment.wordpressTag) === false) {
      getWordPressPosts({offset: offset, tag: environment.wordpressTag});
    }else{
     getWordPressPosts({offset: offset});
    }
     this.setState({offset: offset});
   }

   onRowClick (state, rowInfo, column, instance) {
    const{saveViewPostSelected} = this.props;
    return {
        onClick: e => {
            let post = rowInfo.original.ID;
            saveViewPostSelected(post);
            console.log("SSSSSSSSSs", post);
            window.open('http://localhost:8191/#/viewpost',"_self");

        }
    }
}

  render() {

    const {
      classUserName,
      classPassName
    } = this.state;

    const {
      environment
    } = this.props;

    const {
      username
    } = environment;

    const columns =[
    {
      Header: "Title",
      accessor: "title", // Stringbased value accessors!
      filterable: true,
      sortable: true,
      width: 200
    },
    {
      Header: "Thumb Nail",
      accessor: "post_thumbnail.URL", // Stringbased value accessors!
      filterable: true,
      sortable: true,
      width: 250
    },
    {
      Header: "Excerpt",
      accessor: "excerpt", // Stringbased value accessors!
      filterable: true,
      sortable: true,
      width: 300
    },
    {
      Header: "Time",
      accessor: "modified", // Stringbased value accessors!
      filterable: true,
      sortable: true,
      width: 150
    }
  ];

    return (
      <div>
        <div className="float-left">
        <p style={{cursor: "pointer"}} onClick={this.showHideCategories.bind(this)}>Categories</p>
        
        <div className={this.state.categoryClass}>
          <Nav vertical>
          {this.renderCategories()}
      </Nav>
      </div>
      <p style={{cursor: "pointer"}} onClick={this.showHideTags.bind(this)}>Tags</p>
        
        <div className={this.state.tagsClass}>
          <Nav vertical>
          {this.renderTags()}
      </Nav>
      </div>
      
        </div>
        <div className="animated fadeIn float-left">
            <div className="card">
              <div>
                <div className="card-header">
                  <div style={{textAlign:"center"}}>
                    <i className="list-alt" style={{ color: "#ffffff" }}></i>
                    <h5 style={{textAalign: "center", fontSize:"20px", color:"#ffffff"}}>WordPress Panel</h5>
                  </div>
                </div>
                <div className="card-body">
                {utility.isEmpty(this.props.environment.wordpressPost) === false &&
                  <ReactTable
                                    data={this.props.environment.wordpressPost}
                                    columns={columns}
                                    defaultPageSize={25}
                                    className="-striped -highlight"
                                    showPagination={false}
                                    getTrProps={this.onRowClick.bind(this)}
                  />
                }
              </div>
            </div>
          </div>
      
            <div>
           {this.state.offset > 0 && <Button style={{width:"100px"}} color="secondary" onClick={this.getPreviousData.bind(this)}>Previous</Button>}
            <Button color="secondary" style={{width:"100px"}}  onClick={this.getNextData.bind(this)} >Next</Button>

            </div>
      </div>
      </div>
    );
  }
}

export default Dashboard;
