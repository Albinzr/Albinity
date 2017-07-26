import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}


  render() {

    return (
      <footer>

          <div className="footer">

              <div className="social-footer">
                  <ul>
                      <li>facebook</li>
                      <li>instagram</li>
                      <li>twitter</li>
                      <li>youtube</li>
                  </ul>
              </div>

              <div className="info-footer">
                  <div className="copyright-footer">
                      <ul>
                          <li>Albin</li>
                          <li>©Albin</li>
                      </ul>
                  </div>

                  <div className="aboutme-footer">
                      <p>
                        Escape into the world of Gary Pepper, a realm of vivid colour and endless possibilities. A fashion, travel and lifestyle brand dedicated to capturing everyday beauty, from the simple to the serene. Life motto? The glass is always half full.
                      </p>
                  </div>

                  <div className="other-info-footer">
                      <ul>
                          <li><a>Shop</a></li>
                          <li><a>Shop</a></li>
                          <li><a>Shop</a></li>
                      </ul>
                  </div>

              </div>

          </div>

      </footer>
      );
  }
}

export default App;
