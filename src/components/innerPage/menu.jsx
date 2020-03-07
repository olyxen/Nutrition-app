import React, { Component} from 'react';


class Menu extends Component {

    

render() { 
    return (
         <main class="page-content pt-2">
         <div id="overlay" class="overlay"></div>
         <div class="container-fluid p-5">
             <div class="row">
                 <div class="form-group col-md-12">
                     <h2>Pro Sidebar</h2>
                     <p>This is a responsive sidebar template with dropdown menu based on bootstrap framework.</p>

                 </div>

                 <div class="form-group col-md-12">
                     <a id="toggle-sidebar" class="btn btn-secondary rounded-0" href="#">
                         <span>Toggle Sidebar</span>
                     </a>
                 </div>
             </div>
             <hr/>
         </div>
     </main>
    )
}
}

export default Menu;