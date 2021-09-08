import React from 'react';
import {ListGroup, Form, Badge} from 'react-bootstrap';
import {getIngredients, getIngredientsCategories} from '../../../services/services';
import {MdClose} from 'react-icons/md';

class SearchFormIngredients extends React.Component{
    constructor(props){
        super(props);
        this.state={
            ingTypes:[],
            ingType:null,
            ingredients:[]
        }
        this.setIngTypes = this.setIngTypes.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount(){
        getIngredientsCategories().then(
            res=>{
                this.setState({ingTypes: res.data.categories});
            }
        ).catch(err=>console.log(err));
    
    }

    setIngTypes(e){
        this.handleChange(e);
        getIngredients(e.target.value).then(
            res=>{
                this.setState({ingredients: res.data.ingredients});
            }
        ).catch(err=>console.log(err))
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    handleAdd(e){
        e.preventDefault();
        this.setState(()=>{return{ingredient:e.target.value}})
        this.props.add(e.target.value)
    }
    handleRemove(e){
        this.props.remove(e.target.innerText);
    }
    handleFocus = (event) => {
        event.target.value = '';
      }

    render(){ 
        return (
            <> 
            <Form.Group className="select-ingredients">  
                <Form.Select onChange={this.setIngTypes} name="ingType">
                    <option disabled selected>Types of ingredients</option>
                    {this.state.ingTypes.map(i=>
                        <option key={i.name} value={i.ingredient_category_id}>{i.name}</option>    
                    )}
                </Form.Select> 
                <Form.Select onChange={this.handleAdd} name="ingredient" onFocus={this.handleFocus}>
                    <option disabled selected>Select ingredient</option>
                    {this.state.ingredients.map(i=>
                        <option key={i.name} value={i.name}>{i.name}</option>    
                    )}
                </Form.Select> 
            </Form.Group>

            <ListGroup className="list-ingredients">
            {this.props.ingredients.map(i=>
                 <Badge key={i} onClick={this.handleRemove} bg={this.props.name==="includes" ? "success" : "danger"} >
                     {i}<MdClose onClick={this.handleRemove}/>  
                </Badge>
            )}
            </ListGroup>    

            </>
        )
    }
}

export default SearchFormIngredients;