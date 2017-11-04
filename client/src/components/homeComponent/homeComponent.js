import React, { Component } from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import { baseUrl } from '../../helper/common'
let limit = 4
let offset = 0
class App extends Component {
	constructor(props) {
		//console.log('constructor')
		super(props)
		this.state = {
			posts: [],
			redirect: false,
			loadMore: true
		}
		this.loadMore = this.loadMore.bind(this)
	}

	componentDidMount() {
		//console.log('didMound', this.state.posts, this.props.location.action)
		offset = parseInt(this.props.match.params.offset)

		switch (this.props.pageKey) {
			case 'home':
				if (isNaN(offset)) {
					offset = 0
					let newOffset = offset + limit
					this.props.history.replace('/home/' + newOffset)
					break
				}
				this.getPosts()
				break
			case 'tag':
				let tagKey = this.props.match.params.slug
				if (isNaN(offset)) {
					offset = 0
					let newOffset = offset + limit
					this.props.history.replace('/tag/' + tagKey + '/' + newOffset)
					break
				}
				this.getPostByTag()
				break
			case 'category':
				let categoryKey = this.props.match.params.slug
				if (isNaN(offset)) {
					offset = 0
					let newOffset = offset + limit
					this.props.history.replace(
						'/category/' + categoryKey + '/' + newOffset
					)
					break
				}
				this.getPostByCategory()
				break
			case 'search':
				let searchKey = this.props.match.params.slug
				if (isNaN(offset)) {
					offset = 0
					let newOffset = offset + limit
					this.props.history.replace('/search/' + searchKey + '/' + newOffset)
					break
				}
				this.getSearchResults()
				break
			default:
				this.setState({
					loadMore: false
				})
		}
	}

	loadMore() {
		if (this.state.loadMore) {
			offset += limit

			switch (this.props.pageKey) {
				case 'home':
					this.props.history.replace('/home/' + offset)
					this.getPosts()
					break
				case 'tag':
					let tagKey = this.props.match.params.slug
					this.props.history.replace('/tag/' + tagKey + '/' + offset)
					this.getPostByTag()
					break
				case 'category':
					let categoryKey = this.props.match.params.slug
					this.props.history.replace('/category/' + categoryKey + '/' + offset)
					this.getPostByCategory()
					break
				case 'search':
					let searchKey = this.props.match.params.slug
					this.props.history.replace('/search/' + searchKey + '/' + offset)
					this.getSearchResults()
					break
				default:
					break
			}
		}
	}

	getSearchResults() {
		let searchKey = this.props.match.params.slug
		if (this.state.posts.length === 0 && offset !== 0) {
			limit = offset
			offset = 0
		}
		let url =
			baseUrl +
			'/api/search/' +
			searchKey +
			'?limit=' +
			limit +
			'&offset=' +
			offset
		//console.log(url)
		$.ajax({
			url: url,
			type: 'GET',
			xhrFields: {
				withCredentials: true
			},
			success: function(json) {
				//console.log(json)
				if (this.state.posts.length === 0 && offset === 0) {
					offset = limit
					limit = 4
				}

				if (json.data.length < 4 || limit > json.data.length) {
					this.setState({
						loadMore: false
					})
				}
				if (json.success) {
					let currentPost = this.state.posts
					let combineAllPost = currentPost.concat(json.data)
					this.setState({
						posts: combineAllPost
					})
				}
			}.bind(this),
			error: function(error) {
				//console.log('no network')
			}
		})
	}

	getPostByTag() {
		let tagKey = this.props.match.params.slug
		//console.log(offset, 'urlOffset')
		if (this.state.posts.length === 0 && offset !== 0) {
			limit = offset
			offset = 0
		}

		let url =
			baseUrl + '/api/tag/' + tagKey + '?limit=' + limit + '&offset=' + offset
		//console.log(url)
		$.ajax({
			url: url,
			type: 'GET',
			xhrFields: {
				withCredentials: true
			},
			success: function(json) {
				//console.log(json)
				if (this.state.posts.length === 0 && offset === 0) {
					offset = limit
					limit = 4
				}

				if (json.data.length < 4 || limit > json.data.length) {
					this.setState({
						loadMore: false
					})
				}
				if (json.success) {
					let currentPost = this.state.posts
					let combineAllPost = currentPost.concat(json.data)
					this.setState({
						posts: combineAllPost
					})
				}
			}.bind(this),
			error: function(error) {
				//console.log('no network')
			}
		})
	}

	getPostByCategory() {
		let categoryKey = this.props.match.params.slug
		//console.log(offset, 'urlOffset')
		if (this.state.posts.length === 0 && offset !== 0) {
			limit = offset
			offset = 0
		}

		let url =
			baseUrl +
			'/api/category/' +
			categoryKey +
			'?limit=' +
			limit +
			'&offset=' +
			offset
		//console.log(url)
		$.ajax({
			url: url,
			type: 'GET',
			xhrFields: {
				withCredentials: true
			},
			success: function(json) {
				//console.log(json)
				if (this.state.posts.length === 0 && offset === 0) {
					offset = limit
					limit = 4
				}

				if (json.data.length < 4 || limit > json.data.length) {
					this.setState({
						loadMore: false
					})
				}
				if (json.success) {
					let currentPost = this.state.posts
					let combineAllPost = currentPost.concat(json.data)
					this.setState({
						posts: combineAllPost
					})
				}
			}.bind(this),
			error: function(error) {
				//console.log('no network')
			}
		})
	}
	getPosts() {
		//console.log(offset, 'urlOffset')
		if (this.state.posts.length === 0 && offset !== 0) {
			limit = offset
			offset = 0
		}

		let url = baseUrl + '/api/post?limit=' + limit + '&offset=' + offset
		$.ajax({
			url: url,
			type: 'GET',
			xhrFields: {
				withCredentials: true
			},
			success: function(json) {
				//console.log(json)
				if (this.state.posts.length === 0 && offset === 0) {
					offset = limit
					limit = 4
				}

				if (json.data.length < 4 || limit > json.data.length) {
					this.setState({
						loadMore: false
					})
				}
				if (json.success) {
					let currentPost = this.state.posts
					let combineAllPost = currentPost.concat(json.data)
					this.setState({
						posts: combineAllPost
					})
				}
			}.bind(this),
			error: function(error) {
				//console.log('no network')
			}
		})
	}

	getCategory = post => {
		return post.category[0].name
	}

	share = shareType => {
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
		const formateDate = timeStamp => {
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

		const posts = this.state.posts.map((post, index) => {
			// let postLink = "/post/" + {post.slug}
			return (
				<div key={index}>
					<div className="post-header">
						<ul>
							<li className="post-data">
								&nbsp; &nbsp; &nbsp;
								{formateDate(post.publishedDate)}
								&nbsp; &nbsp; &nbsp;
							</li>
							<li className="post-title">
								<Link to={'/post/' + post.slug}>{post.heading}</Link>
							</li>
							<li className="post-category">{this.getCategory(post)}</li>
						</ul>
					</div>
					<div className="post-container">
						<div className="post-media">
							<Link to={'/post/' + post.slug}>
								<img src={post.mainImage} alt="post" />
							</Link>
						</div>

						<div className="post-summary">
							<p>{post.subHeading}</p>
						</div>

						<div className="post-more-details">
							<div className="post-continue-reading">
								<ul>
									<li>
										<Link to={'/post/' + post.slug}>Continue Reading</Link>
									</li>
								</ul>
							</div>
							<div className="post-share">
								<ul>
									<li>
										<span> SHARE |</span>
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
				</div>
			)
		})
		return (
			<div>
				{posts}

				<div className="load-more-continer">
					<hr />
					<button
						className="load-more"
						onClick={this.loadMore}
						style={{
							display: this.state.loadMore ? 'block' : 'none'
						}}
					>
						Load More
					</button>
				</div>
			</div>
		)
	}
}

export default App
