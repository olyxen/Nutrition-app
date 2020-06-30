import React from "react";


class DetailView extends React.Component {

     state = { recipe: {} };

     componentDidMount(){
        var recipe = JSON.parse(localStorage.getItem("recipe"))
        // console.log(recipe.title)
        this.setState({ recipe });
     }
 
   
    render() {
       
       return (
        
        <div id="content">
        <section class="property-single nav-arrow-b">
            <div class="container">
            <div class="row">
                <div class="col-sm-12">
                <div id="property-single-carousel" class="owl-carousel owl-arrow gallery-property">
                    <div class="carousel-item-b">
                    <div><h3>{this.state.recipe.title}</h3></div>
                    <img id="DVimage" src={this.state.recipe.imgsrc} alt=""></img>
                    </div>
                </div>
                <div class="row justify-content-between">
                    <div class="col-md-7 col-lg-7 section-md-t3">
                        <div class="row">
                            <div class="col-sm-12">
                            <div class="title-box-d">
                                <h3 class="title-d DVtitles">Method</h3>
                            </div>
                            </div>
                        </div>
                        <div class="property-description">
                            <p class="description color-text-a" style={{fontSize:"large", textAlign: "justify"}}>
                               {this.state.recipe.description}
                            </p>
                        </div>
                    </div>
                    <div class="col-md-5 col-lg-4">
                        
                    <div class="property-summary">
                        <div class="row">
                        <div class="col-sm-12">
                            <div class="title-box-d section-t4">
                            <h3 class="title-d DVtitles">Ingredients</h3>
                            </div>
                        </div>
                        </div>
                        <div class="summary-list" style={{marginRight:"2%"}}>
                            
                        <ul class="list" style={{fontSize:"17px"}}>
                            <li class="d-flex justify-content-between">
                                {this.state.recipe.ing1}
                            </li>
                            <li class="d-flex justify-content-between">
                                {this.state.recipe.ing2}
                            </li>
                            <li class="d-flex justify-content-between">
                                {this.state.recipe.ing3}
                            </li>
                            <li class="d-flex justify-content-between">
                                {this.state.recipe.ing4}
                            </li>
                            <li class="d-flex justify-content-between">
                                {this.state.recipe.ing5}
                            </li>
                            <li class="d-flex justify-content-between">
                                {this.state.recipe.ing6}
                            </li>
                            <li class="d-flex justify-content-between">
                                {this.state.recipe.ing7}
                            </li>
                            <li class="d-flex justify-content-between">
                                {this.state.recipe.ing8}
                            </li>
                            <li class="d-flex justify-content-between">
                                {this.state.recipe.ing9}
                            </li>
                            <li class="d-flex justify-content-between">
                                {this.state.recipe.ing10}
                            </li>
                            <li class="d-flex justify-content-between">
                                {this.state.recipe.ing11}
                            </li>
                            <li class="d-flex justify-content-between">
                                {this.state.recipe.ing12}
                            </li>
                            <li class="d-flex justify-content-between">
                                {this.state.recipe.ing13}
                            </li>
                            <li class="d-flex justify-content-between">
                                {this.state.recipe.ing14}
                            </li>
                            <li class="d-flex justify-content-between">
                                {this.state.recipe.ing15}
                            </li>
                            <li class="d-flex justify-content-between">
                                {this.state.recipe.ing16}
                            </li>
                            <li class="d-flex justify-content-between">
                                {this.state.recipe.ing17}
                            </li>
                            <li class="d-flex justify-content-between">
                                {this.state.recipe.ing18}
                            </li>
                            <li class="d-flex justify-content-between">
                                {this.state.recipe.ing19}
                            </li>
                            <li class="d-flex justify-content-between">
                                {this.state.recipe.ing20}
                            </li>
                            
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        </div>
       );
  }
}

export default DetailView;