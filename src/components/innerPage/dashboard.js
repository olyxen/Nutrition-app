import React from 'react';
import { Route, Switch } from "react-router-dom";
import Menu from './menu';
import Sidebar from './sidebar';
import Recipes from './recipes';
import './css/innerpage.css'
import jQuery from 'jquery'
import Meals from './meals';
import DetailView from "./detailView";
import Charts from './charts';
import FAQ from './faq';


function Dash1() {
  return (
    <React.Fragment>
        <div className="d-flex flex-column h-100">
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div className="wrapper">
              <nav id="sidebar" ><Sidebar /></nav>
              <div role="main"  className="flex-shrink-0">
                <Switch>
                  <Route exact path="/dashboard" component={Menu} />
                  <Route exact path="/dashboard/recipes" component={Recipes} />
                  <Route exact path="/dashboard/meals" component={Meals} />
                  <Route exact path ="/dashboard/charts" component={Charts} />
                  <Route exact path="/dashboard/recipes/:title" component={DetailView} />
                  <Route exact path="/dashboard/faq" component={FAQ} />
                </Switch>
              </div>
              <div className="overlay"></div>
            </div>
        </div>
    </React.Fragment>
  );
}

export default Dash1;

jQuery(function ($) {

    $('.overlay').on('click', function () {
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('.overlay').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
  
  });