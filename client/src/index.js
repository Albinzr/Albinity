import React from "react"
import ReactDOM from "react-dom"
import routes from "./router/router.js"
import { BrowserRouter as Router } from "react-router-dom"
import "../public/css/main.css"
import "../public/js/main.js"

const Routes = <Router>{routes}</Router>

const app = document.getElementById("root")

ReactDOM.render(Routes, app)
