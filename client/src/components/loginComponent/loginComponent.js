import React, { Component } from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import { baseUrl } from '../../helper/common'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			username: '',
			password: '',
			redirect: false
		}

		this.setFormData = this.setFormData.bind(this)
		this.login = this.login.bind(this)
	}

	login(event) {
		event.preventDefault()
		const username = this.state.username
		const password = this.state.password

		$.ajax({
			type: 'POST',
			xhrFields: {
				withCredentials: true
			},
			url: baseUrl + '/api/login',
			data: {
				username: username,
				password: password
			}
		})
			.done(
				function(data, status, xhr) {
					//console.log(data)
					if (data.success) {
						this.setState({ redirect: true })
					} else {
						this.setState({ redirect: false })
					}
				}.bind(this)
			)
			.fail(
				function(xhr, status, err) {
					this.setState({ redirect: false })
				}.bind(this)
			)
	}

	setFormData(event) {
		const key = event.target.name
		const value = event.target.value

		switch (key) {
			case 'username':
				this.setState({ username: value })
				break

			case 'password':
				this.setState({ password: value })
				break

			default:
				break
		}
	}

	render() {
		console.log('renderes')
		const { redirect } = this.state

		if (redirect) {
			window.location.replace(window.location.origin + '/apj/dashboard')
		}
		return (
			<div>
				<form onSubmit={this.login}>
					<div>
						<label>
							<b>Username</b>
						</label>
						<input
							type="text"
							placeholder="Enter Username"
							name="username"
							required
							onChange={this.setFormData}
						/>

						<label>
							<b>Password</b>
						</label>
						<input
							type="password"
							placeholder="Enter Password"
							name="password"
							required
							onChange={this.setFormData}
						/>
					</div>

					<input type="submit" value="login" />
				</form>

				<Link to="/home">Login</Link>
			</div>
		)
	}
}

export default App
