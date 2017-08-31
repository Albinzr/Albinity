import React, { Component } from "react"

class App extends Component {
	constructor(props) {
		super(props)
		// this.state = {
		//   affiliation: []
		// };
	}

	componentDidMount() {
		// this.getAffiliation();
	}

	search(event) {
		if (event.key == "Enter") {
			var baseUrl = window.location.origin
			return (window.location = baseUrl + "/search/" + event.target.value)
		}
	}

	// getAffiliation() {
	//   let url = "http://localhost:4000/api/display";
	//
	//   $.ajax({
	//     url: url,
	//     type: "GET",
	//     xhrFields: {
	//       withCredentials: true
	//     },
	//     success: function(json) {
	//       if (json.success) {
	//         this.setState({
	//           affiliation: json.data
	//         });
	//       }
	//     }.bind(this),
	//     error: function(error) {
	//       console.log("no network");
	//     }
	//   });
	// }

	render() {
		return (
			<nav>
				<div className="navbar">
					<div className="inner-navbar">
						<div className="logo">
							<img />
						</div>

						<div className="header-menu">
							<ul>
								<li>Category</li>
								<li>About</li>
								<li>Contact</li>
							</ul>
						</div>

						<div className="social">
							<ul>
								<li>F</li>
								<li>I</li>
								<li>T</li>
								<li>Y</li>
							</ul>
						</div>

						<div className="search">
							<ul>
								<li>S</li>
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
