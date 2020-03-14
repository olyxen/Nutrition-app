import React, { Component} from 'react';
import './dashboard.css'


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
             <div  id="box1">
             <svg height="400" width="400"  >
             {/* #e54343 */}
                <path  stroke-width="17.666666666666668" stroke="#EEEEEE" fill="none" stroke-linecap="round" 
                d=" M 132.5 70.96700000000001 C 322.6375 -5.735701074999994 257.71250000000003 331.7563677416667 135.59166666666667 265.79213225833337 
                C 7.2875000000000005 331.7563677416667 -57.637499999999996 -5.735701074999994 132.5 70.96700000000001 Z" />
                <path fill="#37d67a" d=" M 132.5 53.300333333333334 C 118.4844362 40.293236308333334 126.72888724 2.95035188333334 139.92000000000002 12.225333333333339 
                C 158.05777448 24.150350558333336 133.32444362 25.223599233333335 132.5 53.300333333333334 Z"/>
            </svg>

             </div>
         </div>
     </main>
    )
}
}

export default Menu;