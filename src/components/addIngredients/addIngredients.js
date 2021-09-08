import React from 'react';
import { getIngredients, getIngredientsCategories } from '../../services/services';
import { Form, Button, Col } from 'react-bootstrap';
import '../search-form/search-form.css';

class AddIngredients extends React.Component{
    constructor(props){
        super(props);
        this.state={
            ingTypes:[],
            ingredients:[], 
            measure:"",
            ingredient:{
                ingredient_id:null,
                ingredientName:"",
                quantity:"",
                description:"",
                optional:""    
            } 
        }
        this.setIngTypes = this.setIngTypes.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSwitchAction = this.onSwitchAction.bind(this);
        this.setIngredient = this.setIngredient.bind(this);
        this.handleAddIngredient = this.handleAddIngredient.bind(this);
    }
    
    componentDidMount(){
        getIngredientsCategories().then(res=>{
            this.setState({ingTypes: res.data.categories}); 
        }) 
    }

    setIngTypes(e){
        getIngredients(e.target.value).then(res=>{
            this.setState({ingredients: res.data.ingredients})
        })
    } 

    handleChange(e){
        this.setState({ingredient: {...this.state.ingredient, [e.target.name]:e.target.value}})
    }

    setIngredient(e){
        let ingredientId =  e.target.value;  
        let indx = this.state.ingredients.findIndex(ing=>ing.ingredient_id===ingredientId);
        let measure = this.state.ingredients[indx].measure;
        let ingredientName = this.state.ingredients[indx].name;
        this.setState({
            measure: measure, 
            ingredient: {...this.state.ingredient, ingredient_id:ingredientId, ingredientName:ingredientName} 
        }) 
    }

    onSwitchAction(){ 
        this.setState({ingredient: {...this.state.ingredient, optional:this.state.ingredient.optional==="optional" ? "" : "optional"}})
    }
    handleFocus = (event) => {
        event.target.value = '';
    }
    handleAddIngredient(){
        if(!this.state.ingredient.ingredient_id) return;
        this.props.addIngredient(this.state.ingredient);
        this.setState({ingredient:{
            ingredient_id:null,
            ingredientName:"",
            quantity:"",
            description:"",
            optional:""    
        }}) 
    }

    render(){ 
        let measure = this.state.measure!=="" ? `measured in ${this.state.measure}` : "quantity";
        let isDisabledBtn = this.state.ingredient.ingredient_id && this.state.ingredient.quantity;
        return(  
            <>
            <Form.Group className="select-ingredients" >
                <Form.Select onChange={this.setIngTypes} name="ingType">
                    <option disabled selected>Types of ingredients</option>
                    {this.state.ingTypes.map(i=>
                        <option key={i.name} value={i.ingredient_category_id}>{i.name}</option>    
                    )}
                </Form.Select>  

                <Form.Select onChange={this.setIngredient} name="ingredient_id" onFocus={this.handleFocus}>
                    <option disabled selected>Select ingredient</option>
                    {this.state.ingredients.map(i=>
                        <option key={i.name} value={i.ingredient_id}>{i.name}</option>    
                    )}
                </Form.Select>
                        
                <Form.Control type="text" onChange={this.handleChange} name="quantity" placeholder={measure} value={this.state.ingredient.quantity}  />
                <Form.Control type="text" onChange={this.handleChange} name="description" placeholder="description" value={this.state.ingredient.description}/>
                <Form.Check type="switch" onChange={this.onSwitchAction} checked={this.state.ingredient.optional} name="optional" id="switchEnabled" label="Optional"/> 
            </Form.Group>
            <Col>
                <Button onClick={this.handleAddIngredient} disabled={!isDisabledBtn}>Add Ingredient</Button>                   
            </Col>
            </>
        )
    }
}

export default AddIngredients;