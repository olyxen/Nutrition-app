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
                    <div className="col-xl-4 col-lg-6 sm-12 mb-3">
                        <Card imgsrc={img1} alt="Image" title="Shrimp Linguine Pasta" text="Hands on: 15', Cook Time: 25', Portion(s): 2-4, Difficulty: 2" description="mpla mpla" />  
                    </div>
                    <div className="col-xl-4 col-lg-6 sm-12 mb-3">
                        <Card imgsrc={img2} alt="Image" title="Meat with pineapple" text="Hands on: 15', Cook Time: 25', Portion(s): 2-4, Difficulty: 2"/> 
                    </div>
                    <div className="col-xl-4 col-lg-6 sm-12 mb-3">
                        <Card imgsrc={img3} alt="Image" title="Burger" text="Hands on: 15', Cook Time: 25', Portion(s): 2-4, Difficulty: 2"/> 
                    </div>
                    <div className="col-xl-4 col-lg-6 sm-12 mb-3">
                        <Card imgsrc={img3} alt="Image" title="Burger" text="Hands on: 15', Cook Time: 25', Portion(s): 2-4, Difficulty: 2"/> 
                    </div>
                </div> 
            </div>
        );
    }
}
export default Cards;