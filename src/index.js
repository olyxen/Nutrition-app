import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css"
import "@fortawesome/fontawesome-free/css/all.min.css";
//import "bootstrap-css-only/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";
import FrontPage from "./components/startPage/frontPage";
import DashBoard from "./components/innerPage/dashboard";
import AuthenticatedComponent from "./components/authenticated";
import SignOut from "./components/innerPage/signout";

require("bootstrap");

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={FrontPage} />
      <Route exact path="/signout" component={SignOut} />
      <AuthenticatedComponent>
        <Route exact path="/dashboard" component={DashBoard} />
        <Route exact path="/dashboard/recipes" component={DashBoard} />
        <Route exact path="/dashboard/meals" component={DashBoard} />
        <Route exact path="/dashboard/charts" component={DashBoard} />
        <Route exact path="/dashboard/recipes/:id" component={DashBoard} />
        <Route exact path="/dashboard/faq" component={DashBoard} />
      </AuthenticatedComponent>
      {/* <Route exact path="/FAQ" component={FAQ} />
      <Route exact path="/houses/:id" component={DetailView} /> */}
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
serviceWorker.unregister();