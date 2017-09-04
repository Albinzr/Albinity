import React, { Component } from "react"

class App extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {}

	render() {
		return (
			<footer>
				<div className="footer">
					<div className="social-footer">
						<ul>
							<li className="fa fa-facebook">
								<span>facebook</span>{" "}
							</li>
							<li className="fa fa-twitter">
								<span>twitter</span>
							</li>
							<li className="fa fa-instagram">
								<span>instagram</span>
							</li>
							<li className="fa fa-youtube">
								<span>youtube</span>
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
