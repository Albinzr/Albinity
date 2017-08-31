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
		let searchKey = this.props.match.params.slug
		let url = "http://localhost:4000/api/search?key=" + searchKey
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
		if (post.category != null) {
			return post.category[0].name
		} else {
			return ""
		}
	}
	formateDate = timeStamp => {
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

	render() {
		console.log(this.state.posts)
		if (this.state.posts.length == 0) {
			return (
				<div className="not-found">
					<div className="wrap">
						<i className="fa fa-search search-1" />
						<i className="fa fa-search search-2" />
						<i className="fa fa-search search-3" />
						<i className="fa fa-search search-4" />
						<div className="items">
							<i className="fa fa-file-o" />
							<i className="fa fa-file-archive-o" />
							<i className="fa fa-file-audio-o" />
							<i className="fa fa-file-code-o" />
							<i className="fa fa-file-excel-o" />
							<i className="fa fa-file-image-o" />
							<i className="fa fa-file-pdf-o" />
							<i className="fa fa-file-powerpoint-o" />
							<i className="fa fa-file-video-o" />
							<i className="fa fa-file-word-o" />
						</div>
					</div>
					<h2>No results</h2>
					<p>
						<em>
							We searched far and wide and couldn't <br />find
							anyone matching your search.
						</em>
					</p>
				</div>
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
								{this.formateDate(post.publishedDate)}
								&nbsp; &nbsp; &nbsp;
							</li>
							<li className="post-title">
								<Link to={"/post/" + post.slug}>
									{post.heading}
								</Link>
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
