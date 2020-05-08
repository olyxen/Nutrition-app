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
            calendarVal: 7,
            listOfFoods: [],
            breakfastvalue: '',
            lunchvalue: '',
            dinnervalue: '',
            snackvalue: '',
            breakfastFoods: ["eggs", "orange juice"],
            lunchFoods: [],
            dinnerFoods: [],
            snackFoods: [],
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
        var valueType = e.target.name;
        this.setState({ [valueType]: typingFood });
        console.log(typingFood);
        if(typingFood.length>0){
            axios.get(`http://localhost:8080/api/food/search/${typingFood}`,{})
                .then(res => {
                    //elegxos gia na mhn xtupaei to front an den epistrafei kati swsta apo to back
                    //na to dei3ei an den uparxei error
                    if(!res.data.error && res.data.suggestions!==null){
                         this.setState({listOfFoods: res.data.suggestions.suggestion});
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
            axios.get(`http://localhost:8080/api/food/foodsearch/${val}`,{})
                .then(res => {
                    //elegxos gia na mhn xtupaei to front an den epistrafei kati swsta apo to back
                    //na to dei3ei an den uparxei error
                    if(!res.data.error){
                        var foodName = res.data.foods.food.food_name;
                        var foodId = res.data.foods.food.food_id
                        console.log(foodId +":" + foodName)
                        axios.get(`http://localhost:8080/api/food/foodget/${foodId}`,{}).then(res => {
                            if(!res.data.error) console.log(res.data.food.food_name);
                        })
                    }
                })
            break;
            }
        }
    }

    // patwntas to + o xrhsths prosthetei to faghto pou exei epile3ei o xrhsths sthn lista me ta faghta pou exei faei
    onAddBreakfast = (e) => {
        this.setState(state => {
            const breakfastFoods = state.breakfastFoods.concat(state.breakfastvalue);
            return {
                breakfastFoods,
                breakfastvalue: '',
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
                                {this.state.breakfastFoods.map((addedFoods, index) => (
                                    <div key={addedFoods} className="input-group mb-1">
                                        <input disabled type="text" key={addedFoods} className="form-control"  aria-describedby="basic-addon2" value={addedFoods}>
                                        </input>
                                        
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" id="basic-addon2" onClick={() => this.onRemoveBreakfast(index)}>×</button>
                                        </div>
                                    </div>
                                ))}
                                {/* <ul className="addedFoods">
                                    {this.state.breakfastFoods.map(addedFoods => (
                                        <li key={addedFoods} className="addedFood">
                                            {addedFoods}
                                        </li>
                                    ))}
                                </ul>  */}
                                                                             
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" list = "foods" name="breakfastvalue" placeholder="Add new food" aria-describedby="basic-addon2" value={this.state.breakfastvalue} onChange={this.onChangeValue} onInput={this.onInput}/>
                                    <datalist id="foods">
                                        {this.state.listOfFoods.map(food => (
                                            <option value = {food} key = {food}/>
                                        ))}
                                    </datalist>
                                   <div className="input-group-append">
                                        <button className="btn btn-primary" id="basic-addon2" onClick={this.onAddBreakfast} disabled={!this.state.breakfastvalue} >+</button>
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