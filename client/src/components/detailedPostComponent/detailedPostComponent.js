import React, { Component } from "react"
import $ from "jquery"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import ReactQuill from "react-quill"
import QuillDeltaToHtmlConverter from "quill-delta-to-html"
import FacebookProvider, { Comments } from "react-facebook"

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			post: { tags: [] },
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
				if (json.success) {
					if (json.data != null) {
						this.setState({
							post: json.data,
							html: JSON.parse(json.data.context).ops
						})
					} else {
						this.props.history.push("/notFound")
					}
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
		if (post.category != null) {
			return post.category[0].name
		}
	}

	getHtmlFromPostContext(context) {
		if (context != null) {
			let content = JSON.parse(context)
			return context
		} else {
			return "null"
		}
	}

	render() {
		const tags = this.state.post.tags.map((tag, index) => {
			return (
				<li key={tag._id}>
					<Link to={"/tag/" + tag.name}>{tag.name}</Link>
				</li>
			)
		})

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
							<a>{this.state.post.heading}</a>
						</li>
						<li className="post-category">
							{this.getCategory(this.state.post)}
						</li>
					</ul>
				</div>
				<div className="post-container">
					<div dangerouslySetInnerHTML={this.getHtml()} />
				</div>

				<div className="post-tag-container">
					<hr />
					<ul>{tags}</ul>
				</div>
				<div className="post-comment-container">
					<FacebookProvider appId="514713555531948">
						<Comments />
					</FacebookProvider>
				</div>
			</div>
		)
	}
}

export default App
