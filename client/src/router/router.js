import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import history from "./history.js"

import Home from "../components/homeComponent/homeComponent.js"
import Search from "../components/searchComponent/searchComponent.js"
import Login from "../components/loginComponent/loginComponent.js"
import Dashboard from "../components/dashboardComponent/dashboardComponent.js"
import Header from "../components/headerComponent/headerComponent.js"
import Footer from "../components/footerComponent/footerComponent.js"
import DetailedPost from "../components/detailedPostComponent/detailedPostComponent.js"
// console.log(hashHistory)
const isAuthenticated = () => {
	return true
}

const NoMatch = ({ location }) => (
	<div>
		<h3>
			No match for <code>{location.pathname}</code>
		</h3>
	</div>
)

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
					path="/dashboard"
					exact
					component={Dashboard}
					onEnter={isAuthenticated}
				/>
				<Route path="/login" exact component={Login} />

				<Route path="/post/:slug" exact component={DetailedPost} />

				<Route component={NoMatch} />
			</Switch>
			<Footer />
		</div>
	</Router>
)

export default router
