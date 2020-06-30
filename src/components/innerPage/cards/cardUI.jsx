import React from 'react';
import '../css/card.css';



const Card = props => {
  console.log(props)
  function viewRecipe(){
    localStorage.setItem("recipe", JSON.stringify(props));
    // LocalStorage takes a few milliseconds to execute SO this delay is necessary otherwise redirect will happen before the process is complete
    setTimeout(() => {
      this.setState({ position: 1 });
    }, 2000);
    window.open(`/dashboard/recipes/${props.title}`, "_self"); //to open new page

  }
  return(
    <div className="card text-center shadow col-centered">
      <div className="overflow">
          <img src={props.imgsrc} alt={props.alt} className="card-img-top" onClick={viewRecipe}></img>    
      </div> 
      <div className="card-body text-dark">
          <h4 className="card-title">{props.title}</h4>
          <p className="card-text text-secondary">{props.text}</p>
          <button className="btn btn-outline-success" onClick={viewRecipe}>See the recipe</button>
      </div>
    </div>  
  );

}

export default Card;