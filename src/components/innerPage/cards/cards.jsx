import React, {Component} from 'react';
import Card from './cardUI';
import img1 from '../cardsIMG/recipe1.jpg';
import img2 from '../cardsIMG/re2.jpg';
import img3 from '../cardsIMG/re3.jpg';

class Cards extends Component{

    render(){
        return(
            <div className="container-fluid d-flex justify-content-center">
               <div className="row">
                    <div className="col-md-4">
                        <Card imgsrc={img1} title="Shrimp Linguine Pasta" text="Hands on: 15', Cook Time: 25', Portion(s): 2-4, Difficulty: 2" />  
                    </div>
                    <div className="col-md-4">
                        <Card imgsrc={img2} title="Meat with pineapple" text="Hands on: 15', Cook Time: 25', Portion(s): 2-4, Difficulty: 2"/> 
                    </div>
                    <div className="col-md-4">
                        <Card imgsrc={img3} title="Burger" text="Hands on: 15', Cook Time: 25', Portion(s): 2-4, Difficulty: 2"/> 
                    </div>
                </div> 
            </div>
        );
    }
}
export default Cards;