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
                    <img id="DVimage" src={this.state.recipe.imgsrc} alt=""></img>
                    </div>
                </div>
                <div class="row justify-content-between">
                    <div class="col-md-7 col-lg-7 section-md-t3">
                        <div class="row">
                            <div class="col-sm-12">
                            <div class="title-box-d">
                                <h3 class="title-d DVtitles">Property Description</h3>
                            </div>
                            </div>
                        </div>
                        <div class="property-description">
                            <p class="description color-text-a" style={{fontSize:"large"}}>
                               {this.state.recipe.description}
                            </p>
                        </div>
                    </div>
                    <div class="col-md-5 col-lg-4">
                        
                    <div class="property-summary">
                        <div class="row">
                        <div class="col-sm-12">
                            <div class="title-box-d section-t4">
                            <h3 class="title-d DVtitles">Quick Summary</h3>
                            </div>
                        </div>
                        </div>
                        <div class="summary-list" style={{marginRight:"2%"}}>
                        <ul class="list" style={{fontSize:"17px"}}>
                            <li class="d-flex justify-content-between">
                            <strong>Bedrooms:</strong>
                            <span>systastika</span>
                            </li>
                            <li class="d-flex justify-content-between">
                            <strong>Bathrooms:</strong>
                            <span>systastika</span>
                            </li>
                            <li class="d-flex justify-content-between">
                            <strong>Garage:</strong>
                            <span>systastika</span>
                            </li>
                            <li class="d-flex justify-content-between">
                            <strong>Heating:</strong>
                            <span>systastika</span>
                            </li>
                            <li class="d-flex justify-content-between">
                            <strong>Furnitured:</strong>
                            <span>systastika</span>
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