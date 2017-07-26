import React, { Component } from "react";
import $ from "jquery";
// import cookies  from 'react-cookie';
// import logo from './logo.svg';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {}


  render() {

    return (
      <div>
          <div className="post-header">

              <ul>
                  <li className="post-data"> Date </li>
                  <li className="post-title">Title</li>
                  <li className="post-category">Category</li>
              </ul>

          </div>
          <div className="post-container">

              <div className="post-media">

              </div>

              <div className="post-summary">
                  <p>

                      A five part ‘Destination Guide’ video series for Qantas’ in-flight entertainment, which was viewed by over 1 million people who travel with Qantas every month.
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
                          <li>Continue Reading</li>
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
      );
  }
}

export default App;
