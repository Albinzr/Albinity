import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { baseUrl } from '../../helper/common'

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
		if (event.key === 'Enter') {
			var baseUrl = window.location.origin
			return (window.location = baseUrl + '/search/' + event.target.value)
		}
	}
	showCategoryMenu(event) {
		var element = document.body.getElementsByClassName('category-menu')
		if (element[0] != null) {
			element[0].style.display = 'block'
		}
	}
	hideCategoryMenu(event) {
		//console.log('kkkkkk')
		var element = document.body.getElementsByClassName('category-menu')
		if (element[0] != null) {
			element[0].style.display = 'none'
		}
	}
	getCategories() {
		let url = baseUrl + '/api/category'

		$.ajax({
			url: url,
			type: 'GET',
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
				//console.log('no network')
			}
		})
	}
	goToLink(linkType) {
		switch (linkType) {
			case 'facebook':
				window.open('https://www.facebook.com/albincr.in/')
				return false
			case 'twitter':
				window.open('https://twitter.com/albin_dev')
				return false
			case 'youtube':
				window.open(
					'https://www.youtube.com/channel/UCPn57zyOJgcjMFmpHF6oLqw/featured'
				)
				return false
			case 'instagram':
				window.open('https://www.instagram.com/albinzr')
				return false
			default:
		}
	}

	render() {
		let categories = this.state.categories.map((category, index) => {
			return (
				<li key={index}>
					<Link to={'/category/' + category.name}>{category.name}</Link>
				</li>
			)
		})
		return (
			<nav className="header-container">
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
									<span onClick={this.showCategoryMenu}>Category</span>
									<div className="category-menu">
										<ul style={{ display: 'block' }}>{categories}</ul>
									</div>
								</li>
						
								<li>
									<span>
										<Link to={'/contact'}>Contact</Link>
									</span>
								</li>
							</ul>
						</div>

						<div className="social">
							<ul>
								<li
									className="fa fa-facebook"
									onClick={() => {
										this.goToLink('facebook')
									}}
								/>
								<li
									className="fa fa-twitter"
									onClick={() => {
										this.goToLink('twitter')
									}}
								/>
								<li
									className="fa fa-instagram"
									onClick={() => {
										this.goToLink('instagram')
									}}
								/>
								<li
									className="fa fa-youtube"
									onClick={() => {
										this.goToLink('youtube')
									}}
								/>
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
