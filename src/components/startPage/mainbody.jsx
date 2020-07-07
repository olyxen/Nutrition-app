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
          <p>Nutri App offers comprehensive nutrition information to you easy and fast. Find facts on tens of thousands of foods and compare the facts of daily meals with the charts that are provided from us. Plus, the app lets you track your own meals, and it supplies a complete breakdown of your daily nutrition so you can make adjustments as needed.
Tracking your nutrition has so many benefits, from helping to manage food intolerances to increasing energy, avoiding mood swings, and fueling the rhythms of your day. Whatever your reasons for logging your meals, Nutri App can help.</p>
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