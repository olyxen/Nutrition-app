import React, { Component } from "react";


class FAQ extends Component{

    render() { 
        return (
<div id="content">              
        <div className="accordion FAQ" id="accordionExample">
        <h1>Frequently Asked Questions</h1>
        <div class="card">
            <div class="card-header" id="headingOne">
            <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    1. What is and Why to use the Nutri App?
                </button>
            </h2>
            </div>
            <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div class="card-body">
                <h5><span class="label label-primary">Answer</span></h5>
                <p>Nutri app is a daily food tracker. It helps you to organise and save your daily meals, like a diary. If you are looking for a way to control what do you eat or count the calories you receive everyday or keep tracking of your meals or analyze the quality of the food that you are consuming every day, you are in the right place, Nutri app can help you to do all these! Everything to help you achieve your goal!</p>
            </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header" id="headingTwo">
            <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                2. What can i do with the app?
                </button>
            </h2>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
            <div class="card-body">
                <h5><span class="label label-primary">Answer</span></h5>
                <p>Firstly, by adding you age, sex, height and weight we estimate your BMI and BMR. Then, you can add a food that you ate, for breakfast, for lunch, for dinner or for snack. You can add or delete a meal as many times as you want! You have access in different stats and nutrition facts, daily or weekly charts based on all the food which you consumed.</p>
            </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header" id="headingTwoV2">
            <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwoV2" aria-expanded="false" aria-controls="collapseTwoV2">
                2. What is BMR and BMI?
                </button>
            </h2>
            </div>
            <div id="collapseTwoV2" class="collapse" aria-labelledby="headingTwoV2" data-parent="#accordionExample">
            <div class="card-body">
                <h5><span class="label label-primary">Answer</span></h5>
                <p><b>Body mass index </b> (BMI) is a value derived from the mass (weight) and height of a person. The BMI is defined as the body mass divided by the square of the body height, and is universally expressed in units of kg/m2, resulting from mass in kilograms and height in metres.The BMI is a convenient rule of thumb used to broadly categorize a person as underweight, normal weight, overweight, or obese based on tissue mass (muscle, fat, and bone) and height. Commonly accepted BMI ranges are underweight (under 18.5 kg/m2), normal weight (18.5 to 25), overweight (25 to 30), and obese (over 30). <br/>
                <b>Basal metabolic rate</b> (BMR) is the number of daily calories your body needs to accomplish its most basic life-sustaining functions.</p>
            </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header" id="headingThree">
            <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                3. Who have access to my data?
                </button>
            </h2>
            </div>
            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
            <div class="card-body">
                <h5><span class="label label-primary">Answer</span></h5>
                <p><b>No one!</b> Your data is only yours and can have access to it only through your account.</p>
            </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header" id="headingFour">
            <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                4. How do I add or delete a meal?
                </button>
            </h2>
            </div>
            <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
            <div class="card-body">
                <h5><span class="label label-primary">Answer</span></h5>
                <p>Step one: at the left, on sidebar, you have to click <b>Meals</b>, today is selected as default date, you can change it via the calendar in the top of the page. Then <b>choose</b> in which <b>meal</b> what to add a food, start typing the food and choose one from the recommended. Select the <b>serving</b> that fits you and <b>enter the amount of it</b> at the right field. If you have complete all these steps then you can click the <b>+</b> button and the food is officially added in your food diary! You may want delete a meal, you can do that by simply click the <b>X</b> button of the food that you want to delete and thats it!</p>
            </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header" id="headingFive">
            <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                5. Are all the resutls and nutrients real?
                </button>
            </h2>
            </div>
            <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
            <div class="card-body">
                <h5><span class="label label-primary">Answer</span></h5>
                <p><b>Absolutely yes!</b> Nutri app is using FatSecret API to access all these information. FatSecret is the <b>#1</b> food and nutrition database in the world, utilized by more than 10,000 developers, in more than 50 countries, helping everyday more and more people to achieve their goals!</p>
            </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header" id="headingSix">
            <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                6.Why should I choose nutrition-app?
                </button>
            </h2>
            </div>
            <div id="collapseSix" class="collapse" aria-labelledby="headingSix" data-parent="#accordionExample">
            <div class="card-body">
                <h5><span class="label label-primary">Answer</span></h5>
                <p>Nutri app is a totally <b>free</b> app, available to everyone. Designed in a way to be understandable and at the same time fully functional. You can find any food or brand you want in our database or you can find some interest ideas of recipes that you may want to include in your daily menu. At least you have to give us a chance to prove you how an app like this can change your health and you life!</p>
            </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header" id="headingEight">
            <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                7.Who should I contact in case I face any issues?
                </button>
            </h2>
            </div>
            <div id="collapseEight" class="collapse" aria-labelledby="headingEight" data-parent="#accordionExample">
            <div class="card-body">
                <h5><span class="label label-primary">Answer</span></h5>
                <p>We have a dedicated customer care service team, which is available at your service seven days a week from 8:30 am to 7:30 pm. You can call them on + 30 2310 666666 or mail customer service at support@nutriapp.com.</p>
            </div>
            </div>
        </div>
    </div>
        </div>
          ); 
    }
}
export default FAQ;