import React, { Component } from 'react'
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom'
import history from './history.js'
import $ from 'jquery'

import { baseUrl } from '../helper/common'
import Home from '../components/homeComponent/homeComponent.js'
import Login from '../components/loginComponent/loginComponent.js'
import Dashboard from '../components/dashboardComponent/dashboardComponent.js'
import Header from '../components/headerComponent/headerComponent.js'
import Footer from '../components/footerComponent/footerComponent.js'
import DetailedPost from '../components/detailedPostComponent/detailedPostComponent.js'
import Contact from '../components/contactComponent/contactComponent'

const NoMatch = ({ location }) => (
	<div>
		<h3>
			No match for <code>{location.pathname}</code>
		</h3>
	</div>
)

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isAuthenticated: 'loading'
		}
	}
	componentWillMount() {
		this.isAuthenticated()
	}

	isAuthenticated() {
		const url = baseUrl + '/api/user/status'
		$.ajax({
			url: url,
			type: 'GET',
			xhrFields: {
				withCredentials: true
			},
			success: function(json) {
				if (json.success) {
					this.setState({ isAuthenticated: true })
				} else {
					this.setState({ isAuthenticated: false })
				}
			}.bind(this),
			error: function(error) {
				this.setState({ isAuthenticated: false })
			}
		})
	}

	render() {
		return (
			<Router history={history}>
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

						<Route path="/contact" exact component={Contact} />

						<Route path="/apj/login" exact component={Login} />

						<Route path="/post/:slug" exact component={DetailedPost} />

						<Route
							path="/apj/dashboard"
							render={() => {
								if (this.state.isAuthenticated === 'loading') {
									console.log('in in')
									return <div />
								} else if (this.state.isAuthenticated) {
									console.log('in out')
									return <Dashboard />
								} else {
									return <Redirect to={{ pathname: '/apj/login' }} />
								}
							}}
						/>

						<Route component={NoMatch} />
					</Switch>
					<Footer />
				</div>
			</Router>
		)
	}
}
export default App
