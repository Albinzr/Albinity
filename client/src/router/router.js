import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../components/homeComponent/homeComponent.js";
import Login from "../components/loginComponent/loginComponent.js";
import Dashboard from "../components/dashboardComponent/dashboardComponent.js";
import Header from "../components/headerComponent/headerComponent.js";
import Footer from "../components/footerComponent/footerComponent.js";
import DetailedPost from "../components/detailedPostComponent/detailedPostComponent.js";
const isAuthenticated = () => {
  return true;
};

const router = (
<Router>

	<div>
        <Header/>

		<Route exact={true} path="/" component={Home} />
		<Route path="/Home" component={Home} />
		<Route path="/login" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} onEnter={isAuthenticated} />
        <Route path="/post" component={DetailedPost} />
        <Footer/>

	</div>

	</Router>
);

export default router;
