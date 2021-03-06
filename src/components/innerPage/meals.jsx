import React, { Component} from 'react';
import './css/meals.css'
import './css/dashboard.css';
import DatePicker from './calendar'
import axios from "axios";
import jwt from 'jwt-decode';
import MealPie from './mealPie'

import DatePicker1 from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {UncontrolledPopover} from 'reactstrap';

class Meals extends Component {
    constructor(props) {
        super(props);
    

        this.state = {
            startDate: null,
            user: null,
            calDate: null,
            pickedDate: null,
            breakfastvalueflag: false,
            lunchvalueflag: false,
            dinnervalueflag: false,
            snackvalueflag: false,
            calendarVal: 7,
            listOfFoods: [],
            listOfServings: [],
            breakfastvalue: {},
            lunchvalue: {},
            dinnervalue: {},
            snackvalue: {},
            breakfast: [],
            lunch: [],
            dinner: [],
            snack: [],
            brNutrients:{},
            lnNutrients:{},
            dnNutrients:{},
            snNutrients:{},
            selectedServ: {},
            bmr: null,
            totalDailyCalories: null,
            dailyMealCalories: props.dailyMealCalories,
            totalDailyNutrients: [],
            nutrientsName: ["Protein","Calcium", "Cholesterol","Carbohydrate","Iron","Fat","Sodium","Fiber","Potassium","Sugar","Vitamin A","Vitamin C"],
            nutrientsDataType: ["g","mg","mg","g","mg","g","mg","g","mg","g","mg","mg"]
          };
        }
    

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();

        var token = localStorage.getItem("login");
        var decoded = jwt(token);
        this.setState({bmr: decoded.bmr});
        axios.defaults.headers.common['Authorization'] = `${token}`
        this.setState({user: decoded._id})

        //xreiazetai gia na arxikopoiei thn imeromhnia sthn shmerinh
        var date = new Date();
        this.updateDailyMenu(date)
    }
    
    handleChange = date => {
        console.log(date)
        this.setState({
          startDate: date
        });
      };

    //prosarmozei to hmerologio sto megethos ths othonis
    resize() {
        if(window.innerWidth > 590){
            this.setState({calendarVal:7})        
        }else if(window.innerWidth <= 474){
            this.setState({calendarVal:3})        
        }else{
            this.setState({calendarVal:5})        
        }
    }
    //allazei thn timh tou pickedDate me autin pou epele3e o xrhsths apo to hmerologio
    //kaleite eite otan allazei o xrhsths hmeromhnia eite otan prosthetei h afairei ena geuma, gia na enhmerwsei tis listes
    //twn trofwn me tis kainouries
    updateDailyMenu = (val) =>{
        //krataw thn date apo to calendar prin thn alla3w gia na thn exw kapou wste na mporw na 3ana kalw to 
        //updateDailyMenu xwris na allazei h hmeromhnia sto calendar
        this.setState({calDate:val})
        //kathe fore pou epilegetai allh hmeromhnia adeiazw tous pinakes me ta shmerina geumata
        this.setState({breakfast: []})
        this.setState({lunch: []})
        this.setState({dinner: []})
        this.setState({snack: []})

        //briskei thn akribh wra sthn ellada
        var isoDateTime = new Date(val.getTime() - (val.getTimezoneOffset() * 60000)).toISOString()
        this.setState({pickedDate: isoDateTime})

        //enhmerwnei thn selida se kathe allagh hmeromhnias
        axios.get(`https://nutrition-app-api.herokuapp.com/api/meals/getMeal/${isoDateTime}`)
        .then( res => {
            console.log(res.data)
            //epistrefei ola ta geumata ekeinhs ths hmeras, ta diabazei me mapping kai ta apothikeuei ston antistoixo pinaka
            res.data.map((meal, i) => (
                this.setState({[meal.mealkind]: meal.ingredients})
            ))
        })
        
        this.updateDailyNutrients(isoDateTime)
        this.getChartData(isoDateTime)
    };

    //enhmerwnei tous pinakes me ta stoixeia twn geumatwn, kaleite apo to updateDailyMenu()
    updateDailyNutrients = (isoDateTime) => {

        var defaultNutriJSON = {
            Carbohydrate:0,
            Energy: 0,
            Fat: 0,
            Fiber: 0,
            Protein: 0
        }
        this.setState({brNutrients: defaultNutriJSON})
        this.setState({lnNutrients: defaultNutriJSON})
        this.setState({dnNutrients: defaultNutriJSON})
        this.setState({snNutrients: defaultNutriJSON})
        this.setState({totalDailyCalories: 0})


        axios.get(`https://nutrition-app-api.herokuapp.com/api/meals/getMealsNutri/${isoDateTime}`)
        .then(res => {
            console.log(res.data)
            res.data.map((meal, i) => (
                this.setState({[meal.mealkind]: meal.nutrients}) + this.setState({totalDailyCalories: this.state.totalDailyCalories + meal.nutrients.Energy})
            ))
            this.setState({dailyMealCalories: [this.state.brNutrients.Energy, this.state.lnNutrients.Energy, this.state.dnNutrients.Energy, this.state.snNutrients.Energy]})
        })
    };

    
    getChartData = (isoDateTime) =>{    
        axios.get(`https://nutrition-app-api.herokuapp.com/api/meals/getDailyStats/${isoDateTime}`) 
        .then(res => {
            var nutrients = res.data 
            console.log(nutrients)     
            this.setState({totalDailyNutrients: nutrients})
        })
    }

    // pairnei oti grafei o xrhsths to apothikeuei sthn timh value kai kalei apo to back to autocomplete gia na bgalei
    // protaseis poy isws psaxnei o xrhsths
    //apothikeuei autes tis protaseis sto listOfFoods
    onChangeValue = e => {
        var typingFood = e.target.value;
        var meal = e.target.name;
        
        //katharizo to listOfServings kathe fora pou epilegete allo faghto
        this.setState({listOfServings: []});

        //xreiazetai gt an den uparxei, otan prostheteis ena faghto den se afhnei na psa3eis na prostheseis kapoio allo
        this.setState({ [meal]: {food_name: typingFood} });
        console.log(this.state[meal]);
        if(typingFood.length>0){
            axios.get(`https://nutrition-app-api.herokuapp.com/api/food/autocomplete/${typingFood}`,{})
            .then(res => {
                //elegxos gia na mhn xtupaei to front an den epistrafei kati swsta apo to back
                //na to dei3ei an den uparxei error
                if(!res.data.error && res.data.suggestions!==null){
                    var fatSecretSuggestions = res.data.suggestions.suggestion;
                    //this.setState({listOfFoods: fatSecretSuggestions});
                    if(Array.isArray(fatSecretSuggestions)){
                        this.setState({listOfFoods: fatSecretSuggestions});                        
                    }else {
                        this.setState({listOfFoods: [fatSecretSuggestions]});
                    }                        
                }
            })
        }
    }

    //pairnei to proion pou epilexthike apo thn lista kai fernei ola ta stoixeia gia to 1o proion tou foods.search 
    // (mporei to 1o proion na mhn einai kai auto pou epile3ame dld giati h anazhtish tou food.search den einai panta h idia)
    //px an epile3w chicken epistrefei chicken breast
    onInput = e =>{
        var val = e.target.value;
        var opts = document.getElementById('foods').childNodes;
        var meal = e.target.name;
        var flag = meal + "flag"
        
        for (var i = 0; i < opts.length; i++) {
            if (opts[i].value === val) {
                // An item was selected from the list!
                axios.get(`https://nutrition-app-api.herokuapp.com/api/food/foodsearch/${val}`,{})
                .then(res => {
                    //elegxos gia na mhn xtupaei to front an den epistrafei kati swsta apo to back
                    //na to dei3ei an den uparxei error
                    
                    if(!res.data.error){
                        //afou epilexthike to fagito, apothikeuoume arxika to onoma tou kai to id tou
                        //an den diorthothei to problhma me to chicken kai chicken breast tha htan protimotero na fugei to food_name
                        this.setState({ [meal]: {food_name: res.data.food.food_name, fatSecret_id:res.data.food.food_id} });
                        var fatSecretServings = res.data.food.servings.serving;
                        //to if xreiazetai gt sthn periptwsh pou kapoio faghto exei mono ena serving tote to fatSecretServings den einai 
                        //array alla object kai xtupaei to mapping pio katw otan paei na to diabase
                        if(Array.isArray(fatSecretServings)){
                            this.createServList(fatSecretServings,flag);
                        }else{
                            this.createServList([fatSecretServings],flag);
                        }
                    }
                })
                break;
            }
        }
    }
    
    createServList(fatSecretServings,flagtype){
        this.setState({listOfServings: fatSecretServings});
        this.setState({[flagtype]: true})
    };

    onChangeQuantity = e => {
        var typingGr = e.target.value;
        var meal = e.target.name;

        //elegxos gia to an auto pou grafei o xrhsths einai arithmos kai megaluteros tou 0
        //an den einai bazoume to quantity 1 gia na ginei swsta h pra3h meta sta calories kai adeiazw to typingGr pou grafei o xrhsths 
        let quantity; 
        if(typingGr>0) quantity=typingGr;
        else{quantity=1; typingGr=''}

        if(this.state[meal].serving==='g') quantity = quantity/100;

        this.setState({[meal]: {
            food_name: this.state[meal].food_name,
            fatSecret_id: this.state[meal].fatSecret_id,
            quantity: typingGr,
            serving: this.state[meal].serving,
            calories: this.state.selectedServ.calories * quantity,
            fat: this.state.selectedServ.fat * quantity,
            carb: this.state.selectedServ.carbohydrate * quantity,
            protein: this.state.selectedServ.protein * quantity,
            fiber: this.state.selectedServ.fiber * quantity,
            sodium: this.state.selectedServ.sodium * quantity,
            calcium: this.state.selectedServ.calcium * quantity,
            iron: this.state.selectedServ.iron * quantity,
            cholesterol: this.state.selectedServ.cholesterol * quantity,
            potassium: this.state.selectedServ.potassium * quantity,
            sugar: this.state.selectedServ.sugar * quantity,
            vitamin_a: this.state.selectedServ.vitamin_a * quantity,
            vitamin_c: this.state.selectedServ.vitamin_c * quantity 
        }});
        console.log(this.state[meal])
    };
    
    //xreiazetai gt apothikeuei to serving pou diale3e o xrhsths, to apothikeuoume gia na 
    // dei3oume sto dropdown ti epele3e o xrhsths opws kai gia na apothikeusoyme me setGR tin kataxwrish faghtou
    onChangeServing = (meal,i) => {
        var flag = meal + "flag"
        this.setState({selectedServ: this.state.listOfServings[i]})
        var serv = this.state.listOfServings[i].measurement_description;
        var cal  = this.state.listOfServings[i].calories;
        var fat  = this.state.listOfServings[i].fat;
        var carb  = this.state.listOfServings[i].carbohydrate;
        var protein  = this.state.listOfServings[i].protein;
        var fiber  = this.state.listOfServings[i].fiber;
        var sodium = this.state.listOfServings[i].sodium;
        var calcium = this.state.listOfServings[i].calcium;
        var iron = this.state.listOfServings[i].iron;
        var cholesterol = this.state.listOfServings[i].cholesterol;
        var potassium = this.state.listOfServings[i].potassium;
        var sugar = this.state.listOfServings[i].sugar;
        var vitamin_a = this.state.listOfServings[i].vitamin_a;
        var vitamin_c = this.state.listOfServings[i].vitamin_c;


        let quantity;
        if(this.state[meal].quantity>0) quantity=this.state[meal].quantity;
        else quantity=1;

        if(serv==='g') quantity = quantity/100;

        this.setState({ [meal]: {
            food_name: this.state[meal].food_name,
            fatSecret_id: this.state[meal].fatSecret_id,
            quantity: this.state[meal].quantity,
            serving: serv,
            calories: cal * quantity,
            fat: fat * quantity,
            carb: carb * quantity,
            protein: protein * quantity,
            fiber: fiber * quantity,
            sodium: sodium * quantity,
            calcium: calcium * quantity,
            iron: iron * quantity,
            cholesterol: cholesterol * quantity,
            potassium: potassium * quantity,
            sugar: sugar * quantity,
            vitamin_a: vitamin_a * quantity,
            vitamin_c: vitamin_c * quantity
        }});
        this.setState({[flag]: !this.state[flag]})
    };

    // patwntas to + o xrhsths prosthetei to faghto pou exei epile3ei o xrhsths sthn lista me ta faghta pou exei faei
    onAddFood = (e) => {
        console.log(e.target.name)
        var mealValue = e.target.name + 'value'
        console.log(mealValue)
        axios.put(`https://nutrition-app-api.herokuapp.com/api/meals/addMeal`, {
            "mealkind": e.target.name,
            "date": this.state.pickedDate,
            "user_id": this.state.user,
            "ingredients": [
                {
                    "fatSecret_id": this.state[mealValue].fatSecret_id,
                    "food_name": this.state[mealValue].food_name,
                    "serving": this.state[mealValue].serving,
                    "quantity": this.state[mealValue].quantity,
                    "nutrients":{
                        "sodium":  (this.state[mealValue].sodium),
                        "calcium": (this.state[mealValue].calcium),
                        "carbohydrate": (this.state[mealValue].carb),
                        "fat": (this.state[mealValue].fat),
                        "fiber": (this.state[mealValue].fiber),
                        "iron": (this.state[mealValue].iron),
                        "protein": (this.state[mealValue].protein),
                        "cholesterol": (this.state[mealValue].cholesterol),
                        "potassium": (this.state[mealValue].potassium),
                        "sugar": (this.state[mealValue].sugar),
                        "vitamin_a": (this.state[mealValue].vitamin_a),
                        "vitamin_c": (this.state[mealValue].vitamin_c),
                    },
                    "calories": (Math.floor((this.state[mealValue].calories)*100)/100)
                }
            ],
            "calories": Number(this.state[mealValue].calories)
        })
        .then(res => {
            console.log(res.data);
            this.updateDailyMenu(this.state.calDate)
            this.setState(state => {
                return {
                    [mealValue]: {
                        food_name: '',
                        fatSecret_id: '',
                        quantity: '',
                        serving: '',
                        calories: ''
                    },             
                };
            });
        });
    };

    //patwntas to X o xrhsths afairei to proion apo thn lista me to faghta pou exei faei
    onRemoveFood = i => e => {
        var meal = e.target.name;
        axios.delete(`https://nutrition-app-api.herokuapp.com/api/meals/deleteMeal/${this.state.pickedDate}/${meal}/${this.state[meal][i]._id}`)
        .then((res => {
            console.log(res.data)
            this.updateDailyMenu(this.state.calDate)
        }))
    };

    copyMeal = (e) => {
        var isoDate = new Date((this.state.startDate).getTime() - ((this.state.startDate).getTimezoneOffset() * 60000)).toISOString()
        axios.post(`https://nutrition-app-api.herokuapp.com/api/meals/copyMeal/${this.state.pickedDate}/${e.target.name}/${isoDate}`)
        .then((res => {
            if(res.status === 200){
                alert(`Meal copied successfully to ${this.state.startDate} `)
            }
        }))
    }

render() { 

    return (
        <>
        <div id="content">
            <button type="button" id="sidebarCollapse" className="btn btn-info toogleButton">
                <i className="fas fa-align-left"></i>
            </button>
            <div className="calendar">
                <DatePicker 
                    getSelectedDay={this.updateDailyMenu}
                    maxValue={this.state.calendarVal}
                />            
            </div>
            <hr/>
                <div className="row">
                    <div className="col-xs-12 col-lg-8 col-lg-pull-4 order-lg-1 order-2">
                        <div className="lunchbox breakfast" id="breakfast">
                            <div className="mealform">
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex p-2 bd-highlight">Breakfast</div>
                                    <button id="ScheduleUpdateButton1" data-toggle="tooltip" data-placement="top" title="Copy this meal in another day!" className="addfoodBtn" disabled={!this.state.breakfast[0]}>🡽</button>   
                                </div>     
                                <UncontrolledPopover trigger="legacy" placement="top" target="ScheduleUpdateButton1">
                                { () => (
                                    <div className="copyMealPopUp">
                                        <h6>Please chooce the day to copy the meal</h6>
                                        <DatePicker1 selected={this.state.startDate} onChange={this.handleChange} dateFormat="dd/MM/yyyy" excludeDates={[this.state.calDate]}placeholderText="Pick a day!" isClearable/>
                                        <button type="button" className="btn btn-sm btn-success" name="breakfast" disabled={!this.state.startDate} onClick={this.copyMeal}> Copy it </button>
                                    </div>          
                                )}
                                </UncontrolledPopover>
                                
                                {/* EDW EMFANIZONTAI OI KATAXWRISEIS */}
                                {this.state.breakfast.map((addedFoods, index) => (
                                    <div key={addedFoods.fatSecret_id} className="input-group mb-1">
                                        <input disabled type="text" key={addedFoods} className="form-control"  aria-describedby="basic-addon2" value={addedFoods.food_name}></input>
                                        <div className="input-group-append">
                                            <input  disabled type="text" className="form-control" value={addedFoods.quantity + ' ' + addedFoods.serving}/>
                                        </div>
                                        <label className="form-control">{addedFoods.calories} kcal</label>
                                        <div className="input-group-append">
                                            <button className="btn btn-success" id="basic-addon2" name="breakfast" onClick={this.onRemoveFood(index)}>×</button>
                                        </div>
                                    </div>
                                ))}
                                {/* EDW PROSTHETW TROFIMA    */}
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control food-input" list="foods" id="data1" name="breakfastvalue" placeholder="Add new food"  value={this.state.breakfastvalue.food_name} onChange={this.onChangeValue} onInput={this.onInput}/>
                                    <datalist id="foods">
                                        {this.state.listOfFoods.map(food => (
                                            <option value = {food} key = {food}/>
                                        ))}
                                    </datalist>
                                    <button className="btn serv-dropdown" type="button" onClick={() => this.setState({breakfastvalueflag: !this.state.breakfastvalueflag})} disabled={!this.state.breakfastvalue.food_name}>
                                        { !this.state.breakfastvalueflag && (window.innerWidth > 1280 || (window.innerWidth > 720 && window.innerWidth < 842))? this.state.breakfastvalue.serving : <i/> } <i className="fas fa-caret-down"></i>
                                    </button>
                                    {this.state.breakfastvalueflag && (
                                        <div className="dropdown"> 
                                            {this.state.listOfServings.map((serving, index) => (
                                                <label className="dropdown-item" key = {serving.measurement_description} onClick={(e) => this.onChangeServing("breakfastvalue",index)}>
                                                    {serving.measurement_description + " " + serving.calories +"cal / " + serving.metric_serving_amount + "g"}
                                                </label>
                                            ))}
                                        </div> 
                                    )}
                                    <input  type="text" className="form-control quantity-input" list="servings" name="breakfastvalue" maxLength="4" value={this.state.breakfastvalue.quantity} placeholder="Enter eaten amount like 1.5 or 2 or select another serving" onChange={this.onChangeQuantity} disabled={!this.state.breakfastvalue.serving}/>                                   
                                    <label className="form-control calories-field">{this.state.breakfastvalue.calories}</label>
                                    <div className="input-group-append"> 
                                        <button className="btn btn-success" name="breakfast" id="basic-addon2" onClick={this.onAddFood} disabled={!this.state.breakfastvalue.quantity} >+</button>                                       
                                    </div>
                                </div>
                                {/* EDW FAINONTAI TA STATISTIKA */}
                                <div className="table-responsive">
                                    <table className="table">
                                    
                                    <tbody>
                                    <tr>
                                        <td>Energy</td>
                                        <td>Fat</td>
                                        <td>Carbohydrate</td>
                                        <td>Protein</td>
                                        <td>Fiber</td>
                                    </tr>
                                    <tr>
                                        <td>{this.state.brNutrients.Energy}kcal</td>
                                        <td>{this.state.brNutrients.Fat}g</td>
                                        <td>{this.state.brNutrients.Carbohydrate}g</td>
                                        <td>{this.state.brNutrients.Protein}g</td>
                                        <td>{this.state.brNutrients.Fiber}g</td>
                                    </tr>
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="lunchbox lunch" id="lunch">
                            <div className="mealform">
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex p-2 bd-highlight">Lunch</div>
                                    <button id="ScheduleUpdateButton2" data-toggle="tooltip" data-placement="top" title="Copy this meal in another day!" className="addfoodBtn" disabled={!this.state.lunch[0]}>🡽</button>   
                                </div>     
                                <UncontrolledPopover trigger="legacy" placement="top" target="ScheduleUpdateButton2">
                                { () => (
                                    <div className="copyMealPopUp">
                                        <h6>Please chooce the day to copy the meal</h6>
                                        <DatePicker1 selected={this.state.startDate} onChange={this.handleChange} dateFormat="dd/MM/yyyy" excludeDates={[this.state.calDate]}placeholderText="Pick a day!" isClearable/>
                                        <button type="button" className="btn btn-sm btn-success" name="lunch" disabled={!this.state.startDate} onClick={this.copyMeal}> Copy it </button>
                                    </div>          
                                )}
                                </UncontrolledPopover>
                                {/* EDW EMFANIZONTAI OI KATAXWRISEIS */}                              
                                {this.state.lunch.map((addedFoods, index) => (
                                    <div key={addedFoods.fatSecret_id} className="input-group mb-1">
                                        <input disabled type="text" key={addedFoods} className="form-control"  aria-describedby="basic-addon2" value={addedFoods.food_name}></input>
                                        <div className="input-group-append">
                                            <input  disabled type="text" className="form-control" value={addedFoods.quantity + ' ' + addedFoods.serving}/>
                                        </div>
                                        <label className="form-control">{addedFoods.calories} kcal</label>
                                        <div className="input-group-append">
                                            <button className="btn btn-success" id="basic-addon2" name="lunch" onClick={this.onRemoveFood(index)}>×</button>
                                        </div>
                                    </div>
                                ))}
                                {/* EDW PROSTHETW TROFIMA    */}
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control food-input" list="foods" id="data2" name="lunchvalue" placeholder="Add new food"  value={this.state.lunchvalue.food_name} onChange={this.onChangeValue} onInput={this.onInput}/>
                                    <datalist id="foods">
                                        {this.state.listOfFoods.map(food => (
                                            <option value = {food} key = {food}/>
                                        ))}
                                    </datalist>
                                    <button className="btn serv-dropdown" type="button" onClick={() => this.setState({lunchvalueflag: !this.state.lunchvalueflag})} disabled={!this.state.lunchvalue.food_name}>
                                        { !this.state.lunchvalueflag && (window.innerWidth > 1280 || (window.innerWidth > 720 && window.innerWidth < 842))? this.state.lunchvalue.serving : <i/> } <i className="fas fa-caret-down"></i>
                                    </button>
                                    {this.state.lunchvalueflag && (
                                        <div className="dropdown"> 
                                            {this.state.listOfServings.map((serving, index) => (
                                                <label className="dropdown-item" key = {serving.measurement_description} onClick={(e) => this.onChangeServing("lunchvalue",index)}>
                                                    {serving.measurement_description + " " + serving.calories +"cal / " + serving.metric_serving_amount + "g"}
                                                </label>
                                            ))}
                                        </div> 
                                    )}
                                    <input  type="text" className="form-control quantity-input" list="servings" name="lunchvalue" maxLength="4" value={this.state.lunchvalue.quantity} placeholder="Enter eaten amount like 1.5 or 2 or select another serving" onChange={this.onChangeQuantity} disabled={!this.state.lunchvalue.serving}/>                                   
                                    <label className="form-control calories-field">{this.state.lunchvalue.calories}</label>
                                    <div className="input-group-append"> 
                                        <button className="btn btn-success" name="lunch" id="basic-addon2" onClick={this.onAddFood} disabled={!this.state.lunchvalue.quantity} >+</button>                                       
                                    </div>
                                </div>
                                {/* EDW FAINONTAI TA STATISTIKA */}
                                <div className="table-responsive">
                                    <table className="table">
                                    
                                    <tbody>
                                    <tr>
                                        <td>Energy</td>
                                        <td>Fat</td>
                                        <td>Carbohydrate</td>
                                        <td>Protein</td>
                                        <td>Fiber</td>
                                    </tr>
                                    <tr>
                                        <td>{this.state.lnNutrients.Energy}kcal</td>
                                        <td>{this.state.lnNutrients.Fat}g</td>
                                        <td>{this.state.lnNutrients.Carbohydrate}g</td>
                                        <td>{this.state.lnNutrients.Protein}g</td>
                                        <td>{this.state.lnNutrients.Fiber}g</td>
                                    </tr>
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="lunchbox dinner" id="dinner">
                            <div className="mealform">
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex p-2 bd-highlight">Dinner</div>
                                    <button id="ScheduleUpdateButton3" data-toggle="tooltip" data-placement="top" title="Copy this meal in another day!" className="addfoodBtn" disabled={!this.state.dinner[0]}>🡽</button>   
                                </div>     
                                <UncontrolledPopover trigger="legacy" placement="top" target="ScheduleUpdateButton3">
                                { () => (
                                    <div className="copyMealPopUp">
                                        <h6>Please chooce the day to copy the meal</h6>
                                        <DatePicker1 selected={this.state.startDate} onChange={this.handleChange} dateFormat="dd/MM/yyyy" excludeDates={[this.state.calDate]}placeholderText="Pick a day!" isClearable/>
                                        <button type="button" className="btn btn-sm btn-success" name="dinner" disabled={!this.state.startDate} onClick={this.copyMeal}> Copy it </button>
                                    </div>          
                                )}
                                </UncontrolledPopover>                              
                                {this.state.dinner.map((addedFoods, index) => (
                                    <div key={addedFoods.fatSecret_id} className="input-group mb-1">
                                    <input disabled type="text" key={addedFoods} className="form-control"  aria-describedby="basic-addon2" value={addedFoods.food_name}></input>
                                    <div className="input-group-append">
                                        <input  disabled type="text" className="form-control" value={addedFoods.quantity + ' ' + addedFoods.serving}/>
                                    </div>
                                    <label className="form-control">{addedFoods.calories} kcal</label>
                                    <div className="input-group-append">
                                        <button className="btn btn-success" id="basic-addon2" name="dinner" onClick={this.onRemoveFood(index)}>×</button>
                                    </div>
                                </div>
                                ))}
                                {/* EDW PROSTHETW TROFIMA    */}
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control food-input" list="foods" id="data3" name="dinnervalue" placeholder="Add new food"  value={this.state.dinnervalue.food_name} onChange={this.onChangeValue} onInput={this.onInput}/>
                                    <datalist id="foods">
                                        {this.state.listOfFoods.map(food => (
                                            <option value = {food} key = {food}/>
                                        ))}
                                    </datalist>
                                    <button className="btn serv-dropdown" type="button" onClick={() => this.setState({dinnervalueflag: !this.state.dinnervalueflag})} disabled={!this.state.dinnervalue.food_name}>
                                        { !this.state.dinnervalueflag && (window.innerWidth > 1280 || (window.innerWidth > 720 && window.innerWidth < 842))? this.state.dinnervalue.serving : <i/> } <i className="fas fa-caret-down"></i>
                                    </button>
                                    {this.state.dinnervalueflag && (
                                        <div className="dropdown"> 
                                            {this.state.listOfServings.map((serving, index) => (
                                                <label className="dropdown-item" key = {serving.measurement_description} onClick={(e) => this.onChangeServing("dinnervalue",index)}>
                                                    {serving.measurement_description + " " + serving.calories +"cal / " + serving.metric_serving_amount + "g"}
                                                </label>
                                            ))}
                                        </div> 
                                    )}
                                    <input  type="text" className="form-control quantity-input" list="servings" name="dinnervalue" maxLength="4" value={this.state.dinnervalue.quantity} placeholder="Enter eaten amount like 1.5 or 2 or select another serving" onChange={this.onChangeQuantity} disabled={!this.state.dinnervalue.serving}/>                                   
                                    <label className="form-control calories-field">{this.state.dinnervalue.calories}</label>
                                    <div className="input-group-append"> 
                                        <button className="btn btn-success" name="dinner" id="basic-addon2" onClick={this.onAddFood} disabled={!this.state.dinnervalue.quantity} >+</button>                                       
                                    </div>
                                </div>
                                {/* EDW FAINONTAI TA STATISTIKA */}
                                <div className="table-responsive">
                                    <table className="table">
                                    
                                    <tbody>
                                    <tr>
                                        <td>Energy</td>
                                        <td>Fat</td>
                                        <td>Carbohydrate</td>
                                        <td>Protein</td>
                                        <td>Fiber</td>
                                    </tr>
                                    <tr>
                                        <td>{this.state.dnNutrients.Energy}kcal</td>
                                        <td>{this.state.dnNutrients.Fat}g</td>
                                        <td>{this.state.dnNutrients.Carbohydrate}g</td>
                                        <td>{this.state.dnNutrients.Protein}g</td>
                                        <td>{this.state.dnNutrients.Fiber}g</td>
                                    </tr>
                                    </tbody>
                                    </table>
                                </div>
                            </div>                            
                        </div>
                        <div className="lunchbox snack" id="snack1">
                            <div className="mealform">
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex p-2 bd-highlight">Snack</div>
                                    <button id="ScheduleUpdateButton4" data-toggle="tooltip" data-placement="top" title="Copy this meal in another day!" className="addfoodBtn" disabled={!this.state.snack[0]}>🡽</button>   
                                </div>     
                                <UncontrolledPopover trigger="legacy" placement="top" target="ScheduleUpdateButton4">
                                { () => (
                                    <div className="copyMealPopUp">
                                        <h6>Please chooce the day to copy the meal</h6>
                                        <DatePicker1 selected={this.state.startDate} onChange={this.handleChange} dateFormat="dd/MM/yyyy" excludeDates={[this.state.calDate]}placeholderText="Pick a day!" isClearable/>
                                        <button type="button" className="btn btn-sm btn-success" name="snack" disabled={!this.state.startDate} onClick={this.copyMeal}> Copy it </button>
                                    </div>          
                                )}
                                </UncontrolledPopover>                              
                                {this.state.snack.map((addedFoods, index) => (
                                    <div key={addedFoods.fatSecret_id} className="input-group mb-1">
                                    <input disabled type="text" key={addedFoods} className="form-control"  aria-describedby="basic-addon2" value={addedFoods.food_name}></input>
                                    <div className="input-group-append">
                                        <input  disabled type="text" className="form-control" value={addedFoods.quantity + ' ' + addedFoods.serving}/>
                                    </div>
                                    <label className="form-control">{addedFoods.calories} kcal</label>
                                    <div className="input-group-append">
                                        <button className="btn btn-success" id="basic-addon2" name="snack" onClick={this.onRemoveFood(index)}>×</button>
                                    </div>
                                </div>
                                ))}
                                {/* EDW PROSTHETW TROFIMA    */}
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control food-input" list="foods" id="data4" name="snackvalue" placeholder="Add new food"  value={this.state.snackvalue.food_name} onChange={this.onChangeValue} onInput={this.onInput}/>
                                    <datalist id="foods">
                                        {this.state.listOfFoods.map(food => (
                                            <option value = {food} key = {food}/>
                                        ))}
                                    </datalist>
                                    <button className="btn serv-dropdown" type="button" onClick={() => this.setState({snackvalueflag: !this.state.snackvalueflag})} disabled={!this.state.snackvalue.food_name}>
                                        { !this.state.snackvalueflag && (window.innerWidth > 1280 || (window.innerWidth > 720 && window.innerWidth < 842))? this.state.snackvalue.serving : <i/> } <i className="fas fa-caret-down"></i>
                                    </button>
                                    {this.state.snackvalueflag && (
                                        <div className="dropdown"> 
                                            {this.state.listOfServings.map((serving, index) => (
                                                <label className="dropdown-item" key = {serving.measurement_description} onClick={(e) => this.onChangeServing("snackvalue",index)}>
                                                    {serving.measurement_description + " " + serving.calories +"cal / " + serving.metric_serving_amount + "g"}
                                                </label>
                                            ))}
                                        </div> 
                                    )}
                                    <input  type="text" className="form-control quantity-input" list="servings" name="snackvalue" maxLength="4" value={this.state.snackvalue.quantity} placeholder="Enter eaten amount like 1.5 or 2 or select another serving" onChange={this.onChangeQuantity} disabled={!this.state.snackvalue.serving}/>                                   
                                    <label className="form-control calories-field">{this.state.snackvalue.calories}</label>
                                    <div className="input-group-append"> 
                                        <button className="btn btn-success" name="snack" id="basic-addon2" onClick={this.onAddFood} disabled={!this.state.snackvalue.quantity}>+</button>                                       
                                    </div>
                                </div>
                                {/* EDW FAINONTAI TA STATISTIKA */}
                                <div className="table-responsive">
                                    <table className="table">
                                    
                                    <tbody>
                                    <tr>
                                        <td>Energy</td>
                                        <td>Fat</td>
                                        <td>Carbohydrate</td>
                                        <td>Protein</td>
                                        <td>Fiber</td>
                                    </tr>
                                    <tr>
                                        <td>{this.state.snNutrients.Energy}kcal</td>
                                        <td>{this.state.snNutrients.Fat}g</td>
                                        <td>{this.state.snNutrients.Carbohydrate}g</td>
                                        <td>{this.state.snNutrients.Protein}g</td>
                                        <td>{this.state.snNutrients.Fiber}g</td>
                                    </tr>
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-xs-12 col-lg-4 col-lg-push-8 order-lg-2 order-1">
                        <div className="lunchbox table-responsive">
                                <table className="table table-sm">
                                    <tbody>
                                        <tr className="table-success">
                                            <td colSpan="2">Energy</td>
                                        </tr>
                                    
                                        <tr>
                                            <td>Planned</td>
                                            <td>{this.state.bmr + " kcal"}</td>
                                        </tr>
                                        <tr>
                                            <td>Eaten</td>
                                            <td>{this.state.totalDailyCalories + " kcal"}</td>
                                        </tr>
                                        <tr>
                                            <td>Left</td>
                                            {(this.state.bmr - this.state.totalDailyCalories)>=0?
                                                <td style={{color: "green", fontWeight: "550"}}>{this.state.bmr - this.state.totalDailyCalories + " kcal"}</td>
                                            :
                                                <td style={{color: "red", fontWeight: "550"}}>{this.state.bmr - this.state.totalDailyCalories + " kcal"}</td>
                                            }
                                        </tr>
                                    </tbody>
                                </table>
                        </div>
                        <div className="lunchbox macronutrients">
                            <MealPie dailyMealCalories={{
                                labels: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
                                datasets: [
                                    {
                                        label: 'kcal',
                                        data: this.state.dailyMealCalories,
                                        backgroundColor: [
                                            'rgb(127, 88, 175)',
                                            'rgb(100, 197, 235)',
                                            'rgb(232, 77, 138)',
                                            'rgb(254, 179, 38)'
                                        ]
                                    }
                                ]
                            }} />
                        </div>
                        <div className="lunchbox table-responsive">
                                <table className="table table-sm">
                                    <tbody>
                                        <tr className="table-success">
                                            <td colSpan="2" >Your Daily Nutrients:</td>
                                        </tr>
                                        {this.state.totalDailyNutrients.map((nutrient, index) => (
                                            <tr key={index}>
                                                <td>{this.state.nutrientsName[index]}</td>
                                                <td>{nutrient + " " + this.state.nutrientsDataType[index]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                        </div>
                    </div>
                </div>
            
            
            
            
        </div>
        </>  
    )
}
}

export default Meals;