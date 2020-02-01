import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";
import * as serviceWorker from "./serviceWorker";
import FrontPage from "./components/startPage/frontPage";
import Login from "./components/startPage/login";
import Singup from "./components/startPage/singup";

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={FrontPage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/singup" component={Singup} />
      {/* <Route exact path="/FAQ" component={FAQ} />
      <Route exact path="/houses/:id" component={DetailView} /> */}
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
serviceWorker.unregister();