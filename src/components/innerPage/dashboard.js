import React from 'react';
import Menu from './menu';


function DashBoard() {
  return (
    <React.Fragment>
        <body class="d-flex flex-column h-100">
            <noscript>You need to enable JavaScript to run this app.</noscript>
            {/* <header id="navbar" ><Navbar /></header> */}
            <main role="main" class="flex-shrink-0"><Menu /></main>
        </body>
    </React.Fragment>
  );
}

export default DashBoard;