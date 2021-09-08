import React from 'react';
import {Col} from 'react-bootstrap';

class NutritionFacts extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <>
            <Col>Calories: {this.props.nutritionFacts.calories}</Col>
            <Col>Protein: {this.props.nutritionFacts.protein}g</Col>
            <Col>Carbohydrates: {this.props.nutritionFacts.carbotydrates}g</Col>
            <Col>Fat: {this.props.nutritionFacts.fat}g</Col>
            <Col>Sugars: {this.props.nutritionFacts.sugars}g</Col>
            </>
        )
    }
}

export default NutritionFacts;