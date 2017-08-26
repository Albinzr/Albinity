import React, { Component } from "react"
import $ from "jquery"
import ReactQuill from "react-quill"
import QuillDeltaToHtmlConverter from "quill-delta-to-html"
// import logo from './logo.svg';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			post: [],
			redirect: false,
			html: {}
		}
	}

	componentDidMount() {
		this.getPost()
	}

	getPost() {
		let slug = this.props.match.params.slug
		let url = "http://localhost:4000/api/post/" + slug
		$.ajax({
			url: url,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			success: function(json) {
				console.log(json.data)
				if (json.success) {
					console.log(json.data.context)
					this.setState({
						post: json.data,
						html: JSON.parse(json.data.context).ops
					})
				}
			}.bind(this),
			error: function(error) {
				console.log("no network")
			}
		})
	}

	getHtml() {
		var cfg = {}
		var converter = new QuillDeltaToHtmlConverter(this.state.html, cfg)
		let html = converter.convert()
		console.log(html, "html")
		return { __html: html }
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
		console.log("count")
		let formated = new Date(timeStamp)
		return (
			formated.getDate() +
			"TH " +
			monthShortNames[formated.getMonth() + 1] +
			" " +
			formated.getFullYear()
		)
	}
	getCategory = post => {
		if (post.section != null) {
			// return post.section[0].name
			return post.section[0]
		} else {
			return "null"
		}
	}

	getHtmlFromPostContext(context) {
		console.log(context)
		if (context != null) {
			let content = JSON.parse(context)
			// return post.section[0].name
			return context
		} else {
			return "null"
		}
	}

	render() {
		return (
			<div className="detailed-post">
				<div className="post-header">
					<ul>
						<li className="post-data">
							&nbsp; &nbsp; &nbsp;
							{this.formateDate(this.state.post.publishedDate)}
							&nbsp; &nbsp; &nbsp;
						</li>
						<li className="post-title">
							{this.state.post.heading}
						</li>
						<li className="post-category">
							{this.getCategory(this.state.post)}
						</li>
					</ul>
				</div>
				<div className="post-container">
					<div dangerouslySetInnerHTML={this.getHtml()} />
				</div>
			</div>
		)
	}
}

export default App
