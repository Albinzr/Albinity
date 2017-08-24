import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
  // this.state = {
  //   affiliation: []
  // };
  }

  componentDidMount() {
    // this.getAffiliation();
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
                      <img></img>
                  </div>

                  <div className="header-menu">
                     <ul>
                         <li>Category</li>
                         <li>Shop</li>
                         <li>About</li>
                    </ul>
                  </div>

                  <div className="social">
                      <ul>
                          <li>f</li>
                          <li>i</li>
                          <li>t</li>
                          <li>y</li>
                     </ul>
                  </div>

                  <div className="search">
                      <ul>
                          <li>S</li>
                          <li><input type="text" className="field" name="search" placeholder="SEARCH" /></li>
                      </ul>
                  </div>

              </div>

          </div>

      </nav>
      );
  }
}

export default App;
