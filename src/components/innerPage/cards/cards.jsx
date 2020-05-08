import React, {Component} from 'react';
import Card from './cardUI';

class Cards extends Component{

    render(){
        return(
            <div className="container-fluid d-flex justify-content-center">
               <div className="row">
                    <div className="col-xl-4 col-lg-6 sm-12 mb-3">
                        <Card imgsrc='/cardsIMG/re1.jpg' alt="Image" title="Shrimp Linguine Pasta" text="Hands on: 15', Cook Time: 25', Portion(s): 2-4, Difficulty: 2" description="mpla mpla" />  
                    </div>
                    <div className="col-xl-4 col-lg-6 sm-12 mb-3">
                        <Card imgsrc="/cardsIMG/re2.jpg" alt="Image" title="Meat with pineapple" text="Hands on: 15', Cook Time: 25', Portion(s): 2-4, Difficulty: 2"/> 
                    </div>
                    <div className="col-xl-4 col-lg-6 sm-12 mb-3">
                        <Card imgsrc='/cardsIMG/re3.jpg' alt="Image" title="Burger" text="Hands on: 15', Cook Time: 25', Portion(s): 2-4, Difficulty: 2"/> 
                    </div>
                    <div className="col-xl-4 col-lg-6 sm-12 mb-3">
                        <Card imgsrc='/cardsIMG/re3.jpg' alt="Image" title="Burger" text="Hands on: 15', Cook Time: 25', Portion(s): 2-4, Difficulty: 2"/> 
                    </div>
                </div> 
            </div>
        );
    }
}
export default Cards;