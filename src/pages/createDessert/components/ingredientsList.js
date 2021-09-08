import React from 'react';
import { ListGroup } from 'react-bootstrap';

class IngredientsList extends React.Component{
    constructor(props){
        super(props);
        this.handleDeleteIngredient=this.handleDeleteIngredient.bind(this)
    }
    handleDeleteIngredient(e){
        this.props.deleteIngredient(e.target.dataset.ingredient_id);
    }
    render(){
        return( 
            <ListGroup variant="flush" className="ingredients-list"> 
                {this.props.ingredients.map(i=> 
                    <ListGroup.Item key={i.ingredient_id} onClick={this.handleDeleteIngredient} data-ingredient_id={i.ingredient_id} variant="secondary">
                        {`${i.description} ${i.ingredientName} ${i.quantity} ${i.optional==="optional" ? "(optional)" : ""} `}
                    </ListGroup.Item>  
                )}
            </ListGroup> 
        )
    }
}

export default IngredientsList;