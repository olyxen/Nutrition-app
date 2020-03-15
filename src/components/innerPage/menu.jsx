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

                {/* to parakatw path prepei n xrhsimopoieitai otan bazei 8ermides o xrhsths */}
                <path class="path" stroke-width="17.666666666666668"  fill="none" stroke-linecap="round" 
                d=" M 132.5 70.96700000000001 C 322.6375 -5.735701074999994 257.71250000000003 331.7563677416667 135.59166666666667 265.79213225833337 
                C 7.2875000000000005 331.7563677416667 -57.637499999999996 -5.735701074999994 132.5 70.96700000000001 Z" />
                <g>
                    <defs>
                        <linearGradient id="gg1" x1="0" y1="0" x2="1" y2="0" >
                            <stop offset="0%" style={{stopColor: "rgb(255,255,255)"}} ></stop>
                            <stop offset="50%" style={{stopColor: "rgb(148,227,38)"}} ></stop>
                            <stop offset="100%" style={{stopColor: "rgb(125,218,31)"}} ></stop>
                            {/* <stop offset="100%" stopColor="#EEEEEE"></stop> */}
                            
                        </linearGradient>
                    </defs>
                </g>
                <path fill="#37d67a" d=" M 132.5 53.300333333333334 C 118.4844362 40.293236308333334 126.72888724 2.95035188333334 139.92000000000002 12.225333333333339 
                C 158.05777448 24.150350558333336 133.32444362 25.223599233333335 132.5 53.300333333333334 Z"/>
                <path fill="#EEEEEE" d=" M 132.5 61.427 L 132.5 79.80033333333333 L 130.73333333333332 79.80033333333333 L 121.89999999999999 76.70866666666666 
                L 121.89999999999999 58.600333333333325 Z"></path>

            </svg>

             </div>
         </div>
     </main>
    )
}
}

export default Menu;