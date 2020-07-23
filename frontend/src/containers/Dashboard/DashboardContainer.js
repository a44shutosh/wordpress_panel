import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import {
	navigateTo,
	getWordPressPosts,
	saveCategorySelected,
	saveTagSelected,
	saveViewPostSelected,
} from '../../actions/EnvironmentActions';
import Dashboard from '../../views/Pages/Dashboard/Dashboard';

const DashboardContainer = props => {

	return <Dashboard {...props} />
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
	},
	saveViewPostSelected(post){
		dispatch(saveViewPostSelected(post));
	}
})



export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
