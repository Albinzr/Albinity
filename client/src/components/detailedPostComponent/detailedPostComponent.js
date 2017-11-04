import React, { Component } from 'react'
import $ from 'jquery'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ReactQuill from 'react-quill'
import QuillDeltaToHtmlConverter from 'quill-delta-to-html'
import FacebookProvider, { Comments } from 'react-facebook'
import { baseUrl } from '../../helper/common'
import { Helmet } from 'react-helmet'

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
		//console.log(document, 'ref details')
	}

	getPost() {
		let slug = this.props.match.params.slug
		//console.log(this.props)
		let url = baseUrl + '/api/post/' + slug
		$.ajax({
			url: url,
			type: 'GET',
			xhrFields: {
				withCredentials: true
			},
			success: function(json) {
				//console.log('auth check', json)
				if (json.success) {
					if (json.data != null) {
						this.setState({
							post: json.data,
							html: JSON.parse(json.data.context).ops
						})
					} else {
						this.props.history.push('/notFound')
					}
				}
			}.bind(this),
			error: function(error) {
				//console.log('auth check', error)
				//console.log('no network')
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
			'JAN',
			'FEB',
			'MAR',
			'APR',
			'MAY',
			'JUN',
			'JUl',
			'AUG',
			'SEP',
			'OCT',
			'NOV',
			'DEC'
		]
		let formated = new Date(timeStamp)
		return (
			formated.getDate() +
			'TH ' +
			monthShortNames[formated.getMonth() + 1] +
			' ' +
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
			return 'null'
		}
	}
	share(shareType) {
		switch (shareType) {
			case 'facebook':
				window.open(
					'https://www.facebook.com/sharer/sharer.php?u=' +
						encodeURIComponent(location.href),
					'facebook-share-dialog',
					'width=626,height=436'
				)
				return false
			case 'twitter':
				window.open(
					'https://twitter.com/intent/tweet?text=' +
						encodeURIComponent(location.href)
				)
				return false
			case 'whatsapp':
				window.open(
					'https://web.whatsapp.com/send?text=' +
						encodeURIComponent(location.href)
				)
				return false
			default:
		}
	}

	render() {
		const tags = this.state.post.tags.map((tag, index) => {
			return (
				<li key={tag._id}>
					<Link to={'/tag/' + tag.name}>{tag.name}</Link>
				</li>
			)
		})

		return (
			<div className="detailed-post">
				<Helmet>
					<title>{this.state.post.heading}</title>
					<meta property="og:title" content={this.state.post.heading} />
					<meta property="og:image" content={this.state.post.mainImage} />
					<meta property="og:site_name" content="http://albin.in" />
					<meta
						property="og:description"
						content={this.state.post.subHeading}
					/>
				</Helmet>
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

					<div className="post-more-details">
						<div className="post-share">
							<ul>
								<li>
									SHARE <span>|</span>
								</li>
								<li
									className="fa fa-facebook"
									onClick={() => {
										this.share('facebook')
									}}
								/>
								<li
									className="fa fa-twitter"
									onClick={() => {
										this.share('twitter')
									}}
								/>
								<li
									className="fa fa-whatsapp"
									onClick={() => {
										this.share('whatsapp')
									}}
								/>
							</ul>
						</div>
					</div>
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
