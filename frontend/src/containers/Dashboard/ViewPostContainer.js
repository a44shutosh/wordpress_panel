import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import {
	navigateTo,
	getWordPressPosts,
	saveCategorySelected,
	saveTagSelected
} from '../../actions/EnvironmentActions';
import ViewPost from '../../views/Pages/Dashboard/ViewPost';

const ViewDashboardContainer = props => {

	return <ViewPost {...props} />
};

const mapStateToProps = state => {
	const { environment } = state;
	return {
		environment
	}
}

const mapDispatchToProps = dispatch => ({
	
	redirectTo() {
		dispatch(navigateTo({ path: 'dashboard', keys: "", options: {} }));
	},
	getWordPressPosts(payload) {
        dispatch(getWordPressPosts(payload));
	},
	saveCategorySelected(category){
		dispatch(saveCategorySelected(category));
	},
	saveTagSelected(tag){
		dispatch(saveTagSelected(tag));
	}
})



export default connect(mapStateToProps, mapDispatchToProps)(ViewDashboardContainer);
