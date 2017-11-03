import React from 'react'
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom'
import history from './history.js'
import $ from 'jquery'
import PrivateRoute from './privateRoute'

import { baseUrl } from '../helper/common'
import Home from '../components/homeComponent/homeComponent.js'
import Search from '../components/searchComponent/searchComponent.js'
import Login from '../components/loginComponent/loginComponent.js'
import Dashboard from '../components/dashboardComponent/dashboardComponent.js'
import Header from '../components/headerComponent/headerComponent.js'
import Footer from '../components/footerComponent/footerComponent.js'
import DetailedPost from '../components/detailedPostComponent/detailedPostComponent.js'
// console.log(hashHistory)
function isAuthenticated() {
	const url = baseUrl + '/api/user/status'
	$.ajax({
		url: url,
		type: 'GET',
		xhrFields: {
			withCredentials: true
		},
		success: function(json) {
			debugger
			if (json.success) {
				return <Dashboard />
			} else {
				return <Home />
			}
		}.bind(this),
		error: function(error) {
			return <Home />
		}
	})
}

const NoMatch = ({ location }) => (
	<div>
		<h3>
			No match for <code>{location.pathname}</code>
		</h3>
	</div>
)

const a = ({ location }) => {
	isAuthenticated()
}

const router = (
	<Router>
		<div>
			<Header />
			<Switch>
				<Route
					exact={true}
					path="/"
					component={props => <Home {...props} pageKey="home" />}
				/>
				<Route
					path="/search/:slug"
					exact
					component={props => <Home {...props} pageKey="search" />}
				/>
				<Route
					path="/search/:slug/:offset"
					exact
					component={props => <Home {...props} pageKey="search" />}
				/>
				<Route
					path="/home"
					exact
					component={props => <Home {...props} pageKey="home" />}
				/>
				<Route
					path="/home/:offset"
					exact
					component={props => <Home {...props} pageKey="home" />}
				/>
				<Route
					path="/tag/:slug"
					exact
					component={props => <Home {...props} pageKey="tag" />}
				/>
				<Route
					path="/tag/:slug/:offset"
					exact
					component={props => <Home {...props} pageKey="tag" />}
				/>
				<Route
					path="/category/:slug"
					exact
					component={props => <Home {...props} pageKey="category" />}
				/>
				<Route
					path="/category/:slug/:offset"
					exact
					component={props => <Home {...props} pageKey="category" />}
				/>
				<Route path="/dashboard" exact component={Dashboard} />
				<Route path="/login" exact component={Login} />
				<Route path="/post/:slug" exact component={DetailedPost} />
				<Route component={NoMatch} />
			</Switch>
			<Footer />
		</div>
	</Router>
)

export default router
