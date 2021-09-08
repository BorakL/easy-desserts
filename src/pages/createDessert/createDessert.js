import React from 'react';
import {Form, InputGroup, Row, Col, Button, Alert} from 'react-bootstrap';
import AddIngredients from '../../components/addIngredients/addIngredients';
import { getCategories, postCreateDessert, postDessertPhoto } from '../../services/services';
import { AuthContext } from '../../context/context';
import IngredientsList from './components/ingredientsList';
import "./createDessert.css";
import {FaBlender} from 'react-icons/fa';

class CreateDessert extends React.Component{    
    static contextType = AuthContext;
    constructor(props){
        super(props);
        this.state={
            newDessert:{
                name:"",
                intro:"",
                recipe:"", 
                category_id:"",
                info_time: "",
                info_servings: "",
                nutrition_fact_calories: "",
                nutrition_fact_protein: "",
                nutrition_fact_carbohydrates: "",
                nutrition_fact_fat: "",
                nutrition_fact_sugars:"",
                ingredients:[]    
            },
            selectedFile:null,
            categories:[],
            message:"",
            success:false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteIngredient = this.deleteIngredient.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
        this.fileSelect = this.fileSelect.bind(this);
    }  

    componentDidMount(){ 
        getCategories().then(res=>{
            this.setState({categories:res.data.categories});
        }) 
    }
 
    
    handleChange(e){ 
        this.setState({newDessert: {...this.state.newDessert, [e.target.name]:e.target.value}})
    }

    addIngredient(ingredient){
        if(this.state.newDessert.ingredients.some(i=>i.ingredient_id===ingredient.ingredient_id)){
            alert("You have already added this ingredient!");
            return;
        }
        this.setState({newDessert: {...this.state.newDessert, ingredients:[...this.state.newDessert.ingredients, ingredient] }})    
    }
    deleteIngredient(ingredient_id){
        let ingredients = this.state.newDessert.ingredients; 
        let filteredIngs = ingredients.filter(ing=>Number(ing.ingredient_id)!==Number(ingredient_id)); 
        this.setState({newDessert: {...this.state.newDessert, ingredients:filteredIngs}})
    }

    isFormValid(){
        this.setState({message:"",success:false});
        let requiredFields= Object.keys(this.state.newDessert);
         
        for(let i=0; i<requiredFields.length; i++){
            if(this.state.newDessert[requiredFields[i]]===""){
                this.setState({
                    message: `${requiredFields[i]} is required field`, 
                    success:false
                })
                return false;
            }    
        }  
        if(this.state.newDessert.ingredients.length<2){
            this.setState({
                message:"Smoothies must have a minimum of two ingredients",
                success: false
            })
            return false;
        }
        if(this.state.selectedFile===null){
            this.setState({
                message:"You must upload photo",
                success:false
            });
            return false;
        }
        return true;
    }

    fileSelect(e){
        this.setState({selectedFile: e.target.files[0]});
    }

    handleSubmit(e){
        e.preventDefault();

        if(!this.isFormValid())return; 

        const fd = new FormData();
        fd.append("image",this.state.selectedFile);
        fd.append("imageName",this.state.newDessert.name); 
        postDessertPhoto(fd).then(res=>{
            this.setState({message: res.data.message, success:res.data.success})
            }).then(res=>{
                if(this.state.success){
                    let data = {...this.state.newDessert, author_id:this.context.user.user_id};
                    postCreateDessert(data).then(res=>{
                        this.setState({message:res.data.message, success:res.data.success});
                    }).then(res=>{
                        if(this.state.success){
                            this.setState({
                                newDessert:{
                                    name:"",
                                    intro:"",
                                    recipe:"", 
                                    category_id:"",
                                    info_time: "",
                                    info_servings: "",
                                    nutrition_fact_calories: "",
                                    nutrition_fact_protein: "",
                                    nutrition_fact_carbohydrates: "",
                                    nutrition_fact_fat: "",
                                    nutrition_fact_sugars:"",
                                    ingredients:[]    
                                },
                                selectedFile:null
                            })
                        }
                    })
                } 
            })
    }

    render(){    
        return(
            
            <AuthContext.Consumer>
            {
            (auth)=>( 
            <Form onSubmit={this.handleSubmit} className="create-dessert" encType="multipart/form-data">
                <h2>Create Dessert</h2>
                {this.state.message && <Alert variant={this.state.success ? "success" : "danger"}>{this.state.message}</Alert>}
                <Form.Group as={Row} controlId="formHorizontaName">
                    <Form.Label column sm={2}>Name</Form.Label>
                    <Col sm={10}>
                        <Form.Control onChange={this.handleChange} type="text" name="name" value={this.state.newDessert.name} placeholder="Smoothie Name"  />
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row} controlId="formHorizontaIntro">
                    <Form.Label column sm={2}>Intro</Form.Label>
                    <Col sm={10}>
                        <Form.Control onChange={this.handleChange} type="text" name="intro" value={this.state.newDessert.intro} placeholder="Intro"  />                
                    </Col>
                </Form.Group> 
                
                <Form.Group as={Row} controlId="formHorizontaRecipe">
                    <Form.Label column sm={2}>Recipe</Form.Label>
                    <Col sm={10}>
                        <Form.Control as="textarea" onChange={this.handleChange} name="recipe" value={this.state.newDessert.recipe} placeholder="Recipe"  />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontaName">
                    <Form.Label column sm={2}>Smoothie category</Form.Label>
                    <Col>
                        <Form.Select onChange={this.handleChange} type="text" name="category_id"   >
                            <option selected disabled>Select smoothie category</option>
                            {this.state.categories.map(c=>
                                <option key={c.category_id} value={c.category_id}>{c.name}</option>
                            )}
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontaInfo">
                    <Form.Label column sm={2}>Info</Form.Label>
                    <Col sm={10}>
                        <Row xs={2}> 
                            <Col><Form.Label>time</Form.Label> <Form.Control onChange={this.handleChange} type="number" name="info_time" value={this.state.newDessert.info_time} placeholder="time" min="1"/></Col> 
                            <Col><Form.Label>servings</Form.Label> <Form.Control onChange={this.handleChange} type="number" name="info_servings" value={this.state.newDessert.info_servings} placeholder="servings" min="1"/></Col> 
                        </Row>
                    </Col> 
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontaNutritionFacts">
                    <Form.Label column sm={2}>Nutrition Facts</Form.Label>
                    <Col sm={10}>
                        <InputGroup className="mb-5" size="sm"> 
                        <Row xs={1} md={2} lg={3}> 
                            <Col> <Form.Label>calories</Form.Label><Form.Control onChange={this.handleChange} type="number" name="nutrition_fact_calories" value={this.state.newDessert.nutrition_fact_calories} placeholder="calories" min="0"/> </Col>
                            <Col> <Form.Label>protein</Form.Label><Form.Control onChange={this.handleChange} type="number" name="nutrition_fact_protein" value={this.state.newDessert.nutrition_fact_protein} placeholder="protein" min="0" step="0.1"/> </Col>
                            <Col> <Form.Label>carbohydrates</Form.Label><Form.Control onChange={this.handleChange} type="number" name="nutrition_fact_carbohydrates" value={this.state.newDessert.nutrition_fact_carbohydrates} placeholder="carbohydrates" min="0" step="0.1"/> </Col>
                            <Col> <Form.Label>fat</Form.Label><Form.Control onChange={this.handleChange} type="number" name="nutrition_fact_fat" value={this.state.newDessert.nutrition_fact_fat} placeholder="fat" min="0" step="0.1"/> </Col>
                            <Col> <Form.Label>sugars</Form.Label><Form.Control onChange={this.handleChange} type="number" name="nutrition_fact_sugars" value={this.state.newDessert.nutrition_fact_sugars} placeholder="sugars" min="0" step="0.1"/> </Col>
                        </Row>
                        </InputGroup>
                    </Col> 
                </Form.Group>

                <Form.Group>
                    <h4>Ingredients</h4>
                    <AddIngredients addIngredient={this.addIngredient} />
                </Form.Group>
                
                <IngredientsList ingredients={this.state.newDessert.ingredients} deleteIngredient={this.deleteIngredient}/>
                
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Add image</Form.Label>
                    <Form.Control type="file" name="selectedFile" onChange={this.fileSelect }/>
                </Form.Group>
                
                <Col className="text-center">
                    <Button type="submit"><FaBlender/> Blend it</Button>
                </Col>
                
            </Form> 
            )
            }
            </AuthContext.Consumer> 
        )
    }
}

export default CreateDessert;