import React from "react";


function MainBody() {
    return (
      <div>
        <div id="bannerphoto" className="text-center">     
          <p className="content">
            A food diary is a log of what you consume each day. It can help you make changes to your diet and lose weight.<br/>
            You can use it to improve your health by tracking what you eat and drink.<br/>
            The diary helps you and your doctor understand your eating habits.</p>
        </div>
        <div className="container">
          <div className="row properties3">
            <div className="text-center col-lg-4">
              <img src="/simple-planning.jpg" alt="" className="rounded"></img>
              <h3>Simple planning</h3>
              <p>Nutrition app can help you with managing your health conditions and taking better care of yourself. </p>
            </div>
            <div className="text-center col-lg-4">
              <img src="/easiest-food-tracking.jpg" alt="" className="rounded"></img>  
              <h3>Easiest Food Tracking</h3>           
              <p>Our food database is curated by trained staff to avoid the errors, missing nutrition data, and duplicates that plague other food diary services. </p>            
            </div>
            <div className="text-center col-lg-4">
              <img src="/advice-feedback.jpg" alt="" className="rounded"></img>  
              <h3>Nutrition Analysis</h3>           
              <p>In order to restrict caloric intake, but remain healthy, users of the diet must track their vitamin, mineral, and protein intakes with great care. </p>            
            </div>
          </div>
        </div>
        <br/>
        <br/>
        <hr/>
        <div className="container">
          <h2 className="text-center">About Us</h2>
          <p>Donec sed odio dui. Etiam sem malesuada magna mollis euismod.Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.</p>
        </div>
        <div id="bannerphoto1" >
          <div className="container">
              <div className="float-right">Float right on all viewport sizes</div>
          </div>
        </div>
      </div>
    );
}

export default MainBody;