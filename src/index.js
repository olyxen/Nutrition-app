import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import FrontPage from "./components/startPage/frontPage";

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={FrontPage} />
      {/* <Route exact path="/FAQ" component={FAQ} />
      <Route exact path="/houses/:id" component={DetailView} /> */}
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
serviceWorker.unregister();