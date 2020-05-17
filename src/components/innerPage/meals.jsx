import React, { Component} from 'react';
import './css/meals.css'
import './css/dashboard.css';
import DatePicker from './calendar'
import axios from "axios";

class Meals extends Component {
    constructor(props) {
        super(props);
    
        // this.onChangeValue = this.onChangeValue.bind(this);
        // this.onInput = this.onInput.bind(this);
        // this.addToList = this.addToList.bind(this);

        this.state = {
            flag: false,
            calendarVal: 7,
            listOfFoods: [],
            listOfServings: [],
            breakfastvalue: {},
            lunchvalue: '',
            dinnervalue: '',
            snackvalue: '',
            breakfastFoods: [],
            lunchFoods: [],
            dinnerFoods: [],
            snackFoods: [],
            brNutrients:{
                Energy: 0,
                Fat: 0,
                Carbohydrate: 0,
                Protein: 0,
                Fiber: 0
            },
            selectedServ: {}
          };
    }
    

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }
    
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
    selectedDay = (val) =>{
        console.log(val)
    };  

    // pairnei oti grafei o xrhsths to apothikeuei sthn timh value kai kalei apo to back to autocomplete gia na bgalei
    // protaseis poy isws psaxnei o xrhsths
    //apothikeuei autes tis protaseis sto listOfFoods
    onChangeValue = e => {
        var typingFood = e.target.value;
        var meal = e.target.name;
        
        //katharizo to listOfServings kathe fora pou epilegete allo faghto
        this.setState({listOfServings: []});

        this.setState({ [meal]: {food: typingFood, quantity: '', serving: '', calories: ''} });
        console.log(this.state[meal]);
        if(typingFood.length>0){
            axios.get(`http://localhost:8080/api/food/search/${typingFood}`,{})
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
        
        for (var i = 0; i < opts.length; i++) {
            if (opts[i].value === val) {
                // An item was selected from the list!
                axios.get(`http://localhost:8080/api/food/foodsearchTest/${val}`,{})
                .then(res => {
                    //elegxos gia na mhn xtupaei to front an den epistrafei kati swsta apo to back
                    //na to dei3ei an den uparxei error
                    
                    if(!res.data.error){
                        var fatSecretServings = res.data.food.servings.serving;
                        //to if xreiazetai gt sthn periptwsh pou kapoio faghto exei mono ena serving tote to fatSecretServings den einai 
                        //array alla object kai xtupaei to mapping pio katw otan paei na to diabase
                        if(Array.isArray(fatSecretServings)){
                            this.createServList(fatSecretServings);
                        }else{
                            this.createServList([fatSecretServings]);
                        }
                    }
                })
                break;
            }
        }
    }
    
    createServList(fatSecretServings){
        this.setState({listOfServings: fatSecretServings});
        this.setState({flag: true})
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
            food: this.state[meal].food,
            quantity: typingGr,
            serving: this.state[meal].serving,
            calories: this.state.selectedServ.calories * quantity,
            fat: this.state.selectedServ.fat * quantity,
            carb: this.state.selectedServ.carbohydrate * quantity,
            protein: this.state.selectedServ.protein * quantity,
            fiber: this.state.selectedServ.fiber * quantity 
        }});
        console.log(this.state[meal])
    };
    
    //xreiazetai gt apothikeuei to serving pou diale3e o xrhsths, to apothikeuoume gia na 
    // dei3oume sto dropdown ti epele3e o xrhsths opws kai gia na apothikeusoyme me setGR tin kataxwrish faghtou
    onChangeServing = (meal,i) => {
        this.setState({selectedServ: this.state.listOfServings[i]})
        var serv = this.state.listOfServings[i].measurement_description;
        var cal  = this.state.listOfServings[i].calories;
        var fat  = this.state.listOfServings[i].fat;
        var carb  = this.state.listOfServings[i].carbohydrate;
        var protein  = this.state.listOfServings[i].protein;
        var fiber  = this.state.listOfServings[i].fiber;


        let quantity;
        if(this.state[meal].quantity>0) quantity=this.state[meal].quantity;
        else quantity=1;

        if(serv==='g') quantity = quantity/100;

        this.setState({ [meal]: {
            food: this.state[meal].food,
            quantity: this.state[meal].quantity,
            serving: serv,
            calories: cal * quantity,
            fat: fat * quantity,
            carb: carb * quantity,
            protein: protein * quantity,
            fiber: fiber * quantity
        }});
        this.setState({flag: !this.state.flag})
    };

    addToNutriList(mealType,mealNutrients){
        this.setState({[mealNutrients]: {
            Energy: this.state[mealNutrients].Energy + this.state[mealType].calories ,
            Fat: this.state[mealNutrients].Fat + this.state[mealType].fat,
            Carbohydrate: this.state[mealNutrients].Carbohydrate + this.state[mealType].carb,
            Protein: this.state[mealNutrients].Protein + this.state[mealType].protein,
            Fiber: this.state[mealNutrients].Fiber + this.state[mealType].fiber
            },
        })
        console.log(this.state.brNutrients)
    }

    removeFromNutriList(mealType,mealNutrients,i){
        this.setState({[mealNutrients]: {
            Energy: this.state[mealNutrients].Energy - this.state[mealType][i].calories ,
            Fat: this.state[mealNutrients].Fat - this.state[mealType][i].fat,
            Carbohydrate: this.state[mealNutrients].Carbohydrate - this.state[mealType][i].carb,
            Protein: this.state[mealNutrients].Protein - this.state[mealType][i].protein,
            Fiber: this.state[mealNutrients].Fiber - this.state[mealType][i].fiber
            },
        })
        console.log(this.state.brNutrients)
    }

    // patwntas to + o xrhsths prosthetei to faghto pou exei epile3ei o xrhsths sthn lista me ta faghta pou exei faei
    onAddBreakfast = (e) => {
        this.addToNutriList("breakfastvalue","brNutrients");
        this.setState(state => {
            const breakfastFoods = state.breakfastFoods.concat(state.breakfastvalue);
            return {
                breakfastFoods,
                breakfastvalue: {
                    food: '',
                    quantity: '',
                    serving: '',
                    calories: ''
                },             
            };
        });
    };
    onAddLunch = (e) => {
        this.setState(state => {
            const lunchFoods = state.lunchFoods.concat(state.lunchvalue);
            return {
                lunchFoods,
                lunchvalue: '',
            };
        });
    };
    onAddDinner = (e) => {
        this.setState(state => {
            const dinnerFoods = state.dinnerFoods.concat(state.dinnervalue);
            return {
                dinnerFoods,
                dinnervalue: '',
            };
        });
    };
    onAddSnack = (e) => {
        this.setState(state => {
            const snackFoods = state.snackFoods.concat(state.snackvalue);
            return {
                snackFoods,
                snackvalue: '',
            };
        });
    };

    //patwntas to X o xrhsths afairei to proion apo thn lista me to faghta pou exei faei
    onRemoveBreakfast = i => {
        this.removeFromNutriList("breakfastFoods","brNutrients",i);
        this.setState(state => {
          const breakfastFoods = state.breakfastFoods.filter((item, j) => i !== j);
          return {
            breakfastFoods,
          };
        });
    };
    onRemoveLunch = i => {
        this.setState(state => {
          const lunchFoods = state.lunchFoods.filter((item, j) => i !== j);
          return {
            lunchFoods,
          };
        });
    };
    onRemoveDinner = i => {
        this.setState(state => {
          const dinnerFoods = state.dinnerFoods.filter((item, j) => i !== j);
          return {
            dinnerFoods,
          };
        });
    };
    onRemoveSnack = i => {
        this.setState(state => {
          const snackFoods = state.snackFoods.filter((item, j) => i !== j);
          return {
            snackFoods,
          };
        });
    };


render() { 

    return (
        <>
        <div id="content">
            <button type="button" id="sidebarCollapse" className="btn btn-info toogleButton">
                <i className="fas fa-align-left"></i>
            </button>
            <div className="calendar">
                <DatePicker 
                    getSelectedDay={this.selectedDay}
                    maxValue={this.state.calendarVal}
                />            
            </div>
            <hr/>
                <div className="row">
                    <div className="col-xs-12 col-lg-8 col-lg-pull-4">
                        <div className="lunchbox breakfast" id="breakfast">
                            <div className="mealform">
                                <div className="d-flex p-2 bd-highlight">Breakfast</div>
                                {/* EDW EMFANIZONTAI OI KATAXWRISEIS */}
                                {this.state.breakfastFoods.map((addedFoods, index) => (
                                    <div key={addedFoods.food} className="input-group mb-1">
                                        <input disabled type="text" key={addedFoods} className="form-control"  aria-describedby="basic-addon2" value={addedFoods.food}></input>
                                        <div className="input-group-append">
                                            <input  disabled type="text" className="form-control" value={addedFoods.quantity + ' ' + addedFoods.serving}/>
                                        </div>
                                        <label className="form-control">{addedFoods.calories} kcal</label>
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" id="basic-addon2" onClick={() => this.onRemoveBreakfast(index)}>×</button>
                                        </div>
                                    </div>
                                ))}
                                {/* EDW PROSTHETW TROFIMA    */}
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control food-input" list="foods" id="data1" name="breakfastvalue" placeholder="Add new food"  value={this.state.breakfastvalue.food} onChange={this.onChangeValue} onInput={this.onInput}/>
                                    <datalist id="foods">
                                        {this.state.listOfFoods.map(food => (
                                            <option value = {food} key = {food}/>
                                        ))}
                                    </datalist>
                                    <button className="btn serv-dropdown" type="button" onClick={() => this.setState({flag: !this.state.flag})} disabled={!this.state.breakfastvalue.food}>
                                        { !this.state.flag && (window.innerWidth > 1280 || (window.innerWidth > 720 && window.innerWidth < 842))? this.state.breakfastvalue.serving : <i/> } <i className="fas fa-caret-down"></i>
                                    </button>
                                    {this.state.flag && (
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
                                        <button className="btn btn-primary addfoodBtn" id="basic-addon2" onClick={this.onAddBreakfast} disabled={!this.state.breakfastvalue.quantity} >+</button>                                       
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
                                <div className="d-flex p-2 bd-highlight">Lunch</div>                              
                                {this.state.lunchFoods.map((addedFoods, index) => (
                                    <div key={addedFoods} className="input-group mb-1">
                                        <input disabled type="text" key={addedFoods} className="form-control"  aria-describedby="basic-addon2" value={addedFoods}>
                                        </input>
                                        
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" id="basic-addon2" onClick={() => this.onRemoveLunch(index)}>×</button>
                                        </div>
                                    </div>
                                ))}
                                                                             
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" list = "foods" name="lunchvalue" placeholder="Add new food" aria-describedby="basic-addon2" value={this.state.lunchvalue} onChange={this.onChangeValue} onInput={this.onInput}/>
                                    <datalist id="foods">
                                        {this.state.listOfFoods.map(food => (
                                            <option value = {food} key = {food}/>
                                        ))}
                                    </datalist>
                                   <div className="input-group-append">
                                        <button className="btn btn-primary" id="basic-addon2" onClick={this.onAddLunch} disabled={!this.state.lunchvalue} >+</button>
                                    </div>
                                </div>
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
                                        <td>0 kcal</td>
                                        <td>0g</td>
                                        <td>0g</td>
                                        <td>0g</td>
                                        <td>0g</td>
                                    </tr>
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="lunchbox dinner" id="dinner">
                            <div className="mealform">
                                <div className="d-flex p-2 bd-highlight">Dinner</div>                              
                                {this.state.dinnerFoods.map((addedFoods, index) => (
                                    <div key={addedFoods} className="input-group mb-1">
                                        <input disabled type="text" key={addedFoods} className="form-control"  aria-describedby="basic-addon2" value={addedFoods}>
                                        </input>
                                        
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" id="basic-addon2" onClick={() => this.onRemoveDinner(index)}>×</button>
                                        </div>
                                    </div>
                                ))}
                                                                             
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" list = "foods" name="dinnervalue" placeholder="Add new food" aria-describedby="basic-addon2" value={this.state.dinnervalue} onChange={this.onChangeValue} onInput={this.onInput}/>
                                    <datalist id="foods">
                                        {this.state.listOfFoods.map(food => (
                                            <option value = {food} key = {food}/>
                                        ))}
                                    </datalist>
                                   <div className="input-group-append">
                                        <button className="btn btn-primary" id="basic-addon2" onClick={this.onAddDinner} disabled={!this.state.dinnervalue} >+</button>
                                    </div>
                                </div>
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
                                        <td>0 kcal</td>
                                        <td>0g</td>
                                        <td>0g</td>
                                        <td>0g</td>
                                        <td>0g</td>
                                    </tr>
                                    </tbody>
                                    </table>
                                </div>
                            </div>                            
                        </div>
                        <div className="lunchbox snack" id="snack1">
                            <div className="mealform">
                                <div className="d-flex p-2 bd-highlight">Snack</div>                              
                                {this.state.snackFoods.map((addedFoods, index) => (
                                    <div key={addedFoods} className="input-group mb-1">
                                        <input disabled type="text" key={addedFoods} className="form-control"  aria-describedby="basic-addon2" value={addedFoods}>
                                        </input>
                                        
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" id="basic-addon2" onClick={() => this.onRemoveSnack(index)}>×</button>
                                        </div>
                                    </div>
                                ))}
                                                                             
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" list = "foods" name="snackvalue" placeholder="Add new food" aria-describedby="basic-addon2" value={this.state.snackvalue} onChange={this.onChangeValue} onInput={this.onInput}/>
                                    <datalist id="foods">
                                        {this.state.listOfFoods.map(food => (
                                            <option value = {food} key = {food}/>
                                        ))}
                                    </datalist>
                                   <div className="input-group-append">
                                        <button className="btn btn-primary" id="basic-addon2" onClick={this.onAddSnack} disabled={!this.state.snackvalue} >+</button>
                                    </div>
                                </div>
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
                                        <td>0 kcal</td>
                                        <td>0g</td>
                                        <td>0g</td>
                                        <td>0g</td>
                                        <td>0g</td>
                                    </tr>
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-xs-12 col-lg-4 col-lg-push-8">
                        <div className="lunchbox stats-analysis"></div>
                        <div className="lunchbox macronutrients"></div>
                        <div className="lunchbox micronutrients"></div>
                    </div>
                </div>
            
            
            
            
        </div>
        </>  
    )
}
}

export default Meals;