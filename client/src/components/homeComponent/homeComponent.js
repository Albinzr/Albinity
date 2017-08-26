import React, { Component } from "react"
import $ from "jquery"
// import cookies  from 'react-cookie';
// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

class App extends Component {
	constructor(props) {
		super(props)
		// this.getCategory = this.getCategory.bind(this)
		this.state = {
			posts: [],
			redirect: false
		}
	}

	componentDidMount() {
		this.getPosts()
	}

	getPosts() {
		let url = "http://localhost:4000/api/post"
		$.ajax({
			url: url,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			success: function(json) {
				if (json.success) {
					this.setState({
						posts: json.data
					})
				}
			}.bind(this),
			error: function(error) {
				console.log("no network")
			}
		})
	}

	getCategory = post => {
		if (post.section != null) {
			// return post.category[0].name
			return post.section[0]
		} else {
			return "null"
		}
	}

	render() {
		const formateDate = timeStamp => {
			var monthShortNames = [
				"JAN",
				"FEB",
				"MAR",
				"APR",
				"MAY",
				"JUN",
				"JUl",
				"AUG",
				"SEP",
				"OCT",
				"NOV",
				"DEC"
			]
			let formated = new Date(timeStamp)
			return (
				formated.getDate() +
				"TH " +
				monthShortNames[formated.getMonth() + 1] +
				" " +
				formated.getFullYear()
			)
		}

		const posts = this.state.posts.map((post, index) => {
			// let postLink = "/post/" + {post.slug}
			return (
				<div key={post.publishedDate}>
					<div className="post-header">
						<ul>
							<li className="post-data">
								&nbsp; &nbsp; &nbsp;
								{formateDate(post.publishedDate)}
								&nbsp; &nbsp; &nbsp;
							</li>
							<li className="post-title">
								{post.heading}
							</li>
							<li className="post-category">
								{this.getCategory(post)}
							</li>
						</ul>
					</div>
					<div className="post-container">
						<div className="post-media">
							<Link to={"/post/" + post.slug}>
								<img src={post.mainImage} />
							</Link>
						</div>

						<div className="post-summary">
							<p>
								{post.subHeading}
							</p>
						</div>

						<div className="post-more-details">
							<div className="post-share">
								<ul>
									<li>SHARE |</li>
									<li>f</li>
									<li>t</li>
									<li>w</li>
								</ul>
							</div>

							<div className="post-continue-reading">
								<ul>
									<li>
										<Link to={"/post/" + post.slug}>
											Continue Reading
										</Link>
									</li>
								</ul>
							</div>

							<div className="post-comments">
								<ul>
									<li>Comment</li>
									<li>13</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			)
		})
		return (
			<div>
				{posts}
			</div>
		)
	}
}

export default App
