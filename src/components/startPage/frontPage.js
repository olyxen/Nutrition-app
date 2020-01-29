import React from 'react';
import './frontPage.css'
import Navbar from './navbar';
import MainBody from './mainbody';
import Footer from './footer';

function FrontPage() {
  return (
    <React.Fragment>
        <body class="d-flex flex-column h-100">
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <header><Navbar /></header>
            <main role="main" class="flex-shrink-0"><MainBody /></main>
            <footer id="footer" class="footer mt-auto py-3" ><Footer /></footer>
        </body>
    </React.Fragment>
  );
}

export default FrontPage;