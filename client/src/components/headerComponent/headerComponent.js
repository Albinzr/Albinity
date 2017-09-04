import React, { Component } from "react"
import $ from "jquery"

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			categories: []
		}
	}

	componentDidMount() {
		this.getCategories()
	}

	search(event) {
		if (event.key == "Enter") {
			var baseUrl = window.location.origin
			return (window.location = baseUrl + "/search/" + event.target.value)
		}
	}
	showCategoryMenu(event) {
		var element = document.body.getElementsByClassName("category-menu")
		if (element[0] != null) {
			element[0].style.display = "block"
		}
	}
	hideCategoryMenu(event) {
		console.log("kkkkkk")
		var element = document.body.getElementsByClassName("category-menu")
		if (element[0] != null) {
			element[0].style.display = "none"
		}
	}
	getCategories() {
		let url = "http://localhost:4000/api/category"

		$.ajax({
			url: url,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			success: function(json) {
				if (json.success) {
					this.setState({
						categories: json.data
					})
				}
			}.bind(this),
			error: function(error) {
				console.log("no network")
			}
		})
	}

	render() {
		let categories = this.state.categories.map((category, index) => {
			return (
				<li key={index}>
					{category.name}
				</li>
			)
		})
		return (
			<nav>
				<div className="navbar">
					<div className="inner-navbar">
						<div className="logo">
							<img />
						</div>

						<div className="header-menu">
							<ul>
								<li
									onMouseOver={this.showCategoryMenu}
									onMouseLeave={this.hideCategoryMenu}
								>
									<span onClick={this.showCategoryMenu}>
										Category
									</span>
									<div className="category-menu">
										<ul style={{ display: "block" }}>
											{categories}
										</ul>
									</div>
								</li>
								<li>
									<span>About</span>
								</li>
								<li>
									<span>Contact</span>
								</li>
							</ul>
						</div>

						<div className="social">
							<ul>
								<li className="fa fa-facebook" />
								<li className="fa fa-twitter" />
								<li className="fa fa-instagram" />
								<li className="fa fa-youtube" />
							</ul>
						</div>

						<div className="search">
							<ul>
								<li className="fa fa-search" />
								<li>
									<input
										type="text"
										className="field"
										name="search"
										placeholder="SEARCH"
										onKeyPress={event => {
											this.search(event)
										}}
									/>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
		)
	}
}

export default App
