import React, { Component} from 'react';
import './css/meals.css'
import './css/dashboard.css';
import DatePicker from './calendar'
import axios from "axios";
import jwt from 'jwt-decode';

class Meals extends Component {
    constructor(props) {
        super(props);
    
        // this.onChangeValue = this.onChangeValue.bind(this);
        // this.onInput = this.onInput.bind(this);
        // this.addToList = this.addToList.bind(this);

        this.state = {
            user: null,
            pickedDate: null,
            flag: false,
            calendarVal: 7,
            listOfFoods: [],
            listOfServings: [],
            breakfastvalue: {},
            lunchvalue: '',
            dinnervalue: '',
            snackvalue: '',
            breakfast: [],
            lunch: [],
            dinner: [],
            snack: [],
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

        var token = localStorage.getItem("login");
        var decoded = jwt(token);
        axios.defaults.headers.common['Authorization'] = `${token}`
        this.setState({user: decoded._id})

        //xreiazetai gia na arxikopoiei thn imeromhnia sthn shmerinh
        var date = new Date();
        this.updateDailyMenu(date)
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
    //allazei thn timh tou pickedDate me autin pou epele3e o xrhsths apo to hmerologio
    updateDailyMenu = (val) =>{
        //kathe fore pou epilegetai allh hmeromhnia adeiazw tous pinakes me ta shmerina geumata
        this.setState({breakfast: []})
        this.setState({lunch: []})
        this.setState({dinner: []})
        this.setState({snack: []})

        //briskei thn akribh wra sthn ellada
        var isoDateTime = new Date(val.getTime() - (val.getTimezoneOffset() * 60000)).toISOString()
        this.setState({pickedDate: isoDateTime})

        //enhmerwnei thn selida se kathe allagh hmeromhnias
        axios.get(`http://localhost:8080/api/meals/getMeal/${isoDateTime}`)
        .then( res => {
            console.log(res.data)
            //epistrefei ola ta geumata ekeinhs ths hmeras, ta diabazei me mapping kai ta apothikeuei ston antistoixo pinaka
            res.data.map((meal, i) => (
                this.setState({[meal.mealkind]: meal.ingredients})
            ))
        })
    };  

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
        var meal = e.target.name;
        
        for (var i = 0; i < opts.length; i++) {
            if (opts[i].value === val) {
                // An item was selected from the list!
                axios.get(`http://localhost:8080/api/food/foodsearchTest/${val}`,{})
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

        axios.put(`http://localhost:8080/api/meals/addMeal`, {
            "mealkind": "breakfast",
            "date": this.state.pickedDate,
            "user_id": this.state.user,
            "ingredients": [
                {
                    "fatSecret_id": this.state.breakfastvalue.fatSecret_id,
                    "food_name": this.state.breakfastvalue.food_name,
                    "serving": this.state.breakfastvalue.serving,
                    "quantity": this.state.breakfastvalue.quantity,
                    "nutrients":{
                        "sodium": this.state.breakfastvalue.sodium,
                        "calcium": this.state.breakfastvalue.calcium,
                        "carbohydrate": this.state.breakfastvalue.carb,
                        "fat": this.state.breakfastvalue.fat,
                        "fiber": this.state.breakfastvalue.fiber,
                        "iron": this.state.breakfastvalue.iron,
                        "protein": this.state.breakfastvalue.protein,
                        "cholesterol": this.state.breakfastvalue.cholesterol,
                        "potassium": this.state.breakfastvalue.potassium,
                        "sugar": this.state.breakfastvalue.sugar,
                        "vitamin_a": this.state.breakfastvalue.vitamin_a,
                        "vitamin_c": this.state.breakfastvalue.vitamin_c
                    },
                    "calories": this.state.breakfastvalue.calories
                }
            ],
            "calories": Number(this.state.breakfastvalue.calories)
        })
        .then(res => {
            console.log(res.data);

            this.setState(state => {
                const breakfast = state.breakfast.concat(state.breakfastvalue);
                return {
                    breakfast,
                    breakfastvalue: {
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

    onAddLunch = (e) => {
        this.setState(state => {
            const lunch = state.lunch.concat(state.lunchvalue);
            return {
                lunch,
                lunchvalue: '',
            };
        });
    };
    onAddDinner = (e) => {
        this.setState(state => {
            const dinner = state.dinner.concat(state.dinnervalue);
            return {
                dinner,
                dinnervalue: '',
            };
        });
    };
    onAddSnack = (e) => {
        this.setState(state => {
            const snack = state.snack.concat(state.snackvalue);
            return {
                snack,
                snackvalue: '',
            };
        });
    };

    //patwntas to X o xrhsths afairei to proion apo thn lista me to faghta pou exei faei
    onRemoveBreakfast = i => {
        this.removeFromNutriList("breakfast","brNutrients",i);
        axios.delete(`http://localhost:8080/api/meals/deleteMeal/${this.state.pickedDate}/${'breakfast'}/${this.state.breakfast[i].fatSecret_id}`)
        .then((res => {
            console.log(res.data)
        }))

        this.setState(state => {
          const breakfast = state.breakfast.filter((item, j) => i !== j);
          return {
            breakfast,
          };
        });
    };
    onRemoveLunch = i => {
        this.setState(state => {
          const lunch = state.lunch.filter((item, j) => i !== j);
          return {
            lunch,
          };
        });
    };
    onRemoveDinner = i => {
        this.setState(state => {
          const dinner = state.dinner.filter((item, j) => i !== j);
          return {
            dinner,
          };
        });
    };
    onRemoveSnack = i => {
        this.setState(state => {
          const snack = state.snack.filter((item, j) => i !== j);
          return {
            snack,
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
                    getSelectedDay={this.updateDailyMenu}
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
                                {this.state.breakfast.map((addedFoods, index) => (
                                    <div key={addedFoods.fatSecret_id} className="input-group mb-1">
                                        <input disabled type="text" key={addedFoods} className="form-control"  aria-describedby="basic-addon2" value={addedFoods.food_name}></input>
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
                                    <input type="text" className="form-control food-input" list="foods" id="data1" name="breakfastvalue" placeholder="Add new food"  value={this.state.breakfastvalue.food_name} onChange={this.onChangeValue} onInput={this.onInput}/>
                                    <datalist id="foods">
                                        {this.state.listOfFoods.map(food => (
                                            <option value = {food} key = {food}/>
                                        ))}
                                    </datalist>
                                    <button className="btn serv-dropdown" type="button" onClick={() => this.setState({flag: !this.state.flag})} disabled={!this.state.breakfastvalue.food_name}>
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
                                {this.state.lunch.map((addedFoods, index) => (
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
                                {this.state.dinner.map((addedFoods, index) => (
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
                                {this.state.snack.map((addedFoods, index) => (
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