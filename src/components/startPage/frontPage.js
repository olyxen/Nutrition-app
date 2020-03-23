import React from 'react';
import './frontPage.css'
import Navbar from './navbar';
import MainBody from './mainbody';
import Footer from './footer';
import jQuery from 'jquery'


function FrontPage() {
  return (
    <React.Fragment>
        <div className="d-flex flex-column h-100">
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <header id="navbar" ><Navbar /></header>
            <main role="main" className="flex-shrink-0"><MainBody /></main>
            <footer id="footer" className="footer mt-auto py-3" ><Footer /></footer>
        </div>
    </React.Fragment>
  );
}

export default FrontPage;

jQuery(function ($) {
  
  $('#home').on('click', function () {
    $('html,body').animate({ scrollTop: 0 }, 'slow');
        return false;
  })

})