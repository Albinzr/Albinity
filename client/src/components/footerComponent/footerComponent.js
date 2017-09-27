import React, { Component } from 'react'

class App extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {}
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
		return (
			<footer>
				<div className="footer">
					<div className="social-footer">
						<ul>
							<li className="fa fa-facebook">
								<span
									onClick={() => {
										this.goToLink('facebook')
									}}
								>
									facebook
								</span>
							</li>
							<li className="fa fa-twitter">
								<span
									onClick={() => {
										this.goToLink('twitter')
									}}
								>
									twitter
								</span>
							</li>
							<li className="fa fa-instagram">
								<span
									onClick={() => {
										this.goToLink('instagram')
									}}
								>
									instagram
								</span>
							</li>
							<li className="fa fa-youtube">
								<span
									onClick={() => {
										this.goToLink('youtube')
									}}
								>
									youtube
								</span>
							</li>
						</ul>
					</div>

					<div className="info-footer">
						<div className="copyright-footer">
							<ul>
								<li>&nbsp;</li>
							</ul>
						</div>

						<div className="aboutme-footer">
							<p>&nbsp;</p>
						</div>

						<div className="other-info-footer">
							<ul>&nbsp;</ul>
						</div>
					</div>
				</div>
			</footer>
		)
	}
}

export default App
