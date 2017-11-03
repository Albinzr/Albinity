import React, { PropTypes } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Dashboard from '../components/dashboardComponent/dashboardComponent.js'
const PrivateRoute = ({ component, exact = false, path, authenticated }) => (
	<Route
		exact={exact}
		path={path}
		render={props => {
			if (authenticated) {
				return <Dashboard />
			} else {
				debugger
				return (
					<Redirect to={{ pathname: '/', state: { from: props.location } }} />
				)
			}
		}}
	/>
)

const { object, bool, string, func } = PropTypes

PrivateRoute.propTypes = {
	component: func.isRequired,
	exact: bool,
	path: string.isRequired,
	authenticated: bool.isRequired,
	location: object
}

export default PrivateRoute
