import React from 'react';
import { Route, Switch } from "react-router-dom";
import Menu from './menu';
import Sidebar from './sidebar';
import Recipes from './recipes';
import './css/innerpage.css'
import jQuery from 'jquery'


function Dash1() {
  return (
    <React.Fragment>
        <body class="d-flex flex-column h-100">
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div class="wrapper">
              <nav id="sidebar" ><Sidebar /></nav>
              <div role="main"  class="flex-shrink-0">
                <Switch>
                  <Route exact path="/dashboard" component={Menu} />
                  <Route exact path="/dashboard/recipes" component={Recipes} />
                </Switch>
              </div>
              <div class="overlay"></div>

            </div>
        </body>
    </React.Fragment>
  );
}

export default Dash1;

jQuery(function ($) {

    $('#dismiss, .overlay').on('click', function () {
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