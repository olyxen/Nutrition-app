import React from 'react';
import Menu from './menu';
import Sidebar from './sidebar';
import './css/main.css'
import './css/sidebar-themes.css'
import jQuery from 'jquery'


function DashBoard() {
  return (
    <React.Fragment>
        <body class="d-flex flex-column h-100">
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
              <header id="navbar" ><Sidebar /></header>
              <main role="main" class="flex-shrink-0"><Menu /></main>
            </div>
        </body>
    </React.Fragment>
  );
}

export default DashBoard;


jQuery(function ($) {

  // Dropdown menu
  $(".sidebar-dropdown > a").click(function () {
      $(".sidebar-submenu").slideUp(200);
      if ($(this).parent().hasClass("active")) {
          $(".sidebar-dropdown").removeClass("active");
          $(this).parent().removeClass("active");
      } else {
          $(".sidebar-dropdown").removeClass("active");
          $(this).next(".sidebar-submenu").slideDown(200);
          $(this).parent().addClass("active");
      }

  });

  //toggle sidebar
  $("#toggle-sidebar").click(function () {
      $(".page-wrapper").toggleClass("toggled");
  });

  //toggle sidebar overlay
  $("#overlay").click(function () {
      $(".page-wrapper").toggleClass("toggled");
  });

  // toggle border radius
  $("#toggle-border-radius").change(function (e) {
      e.preventDefault();
      $('.page-wrapper').toggleClass("border-radius-on");
  });

});