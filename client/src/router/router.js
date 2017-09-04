import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
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

const router = (
	<Router>
		<div>
			<Header />
			<Route
				exact={true}
				path="/"
				component={props => <Home {...props} pageKey="home" />}
			/>

			<Route
				path="/search/:slug"
				component={props => <Home {...props} pageKey="home" />}
			/>

			<Route
				path="/home"
				component={props => <Home {...props} pageKey="home" />}
			/>
			<Route
				path="/tag/:slug"
				component={props => <Home {...props} pageKey="tag" />}
			/>

			<Route
				path="/dashboard"
				component={Dashboard}
				onEnter={isAuthenticated}
			/>
			<Route path="/login" component={Login} />

			<Route path="/post/:slug" component={DetailedPost} />

			<Footer />
		</div>
	</Router>
)

export default router
