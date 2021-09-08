import React from 'react';
import { Col, Row } from 'react-bootstrap';
import DessertItem from '../../components/dessertItem/dessertItem';
import Header from '../../components/header/header';
import { getDesserts, getIngredient } from '../../services/services';

class Ingredient extends React.Component{
    constructor(props){
        super(props);
        this.state={
            ingredient:null,
            desserts:[]
        }
    }
    componentDidMount(){
        let ingredientName = this.props.ingredient.ingredientName;
        getIngredient(ingredientName).then(res=>{
            this.setState({ingredient:res.data.ingredient})
        })
        getDesserts(null,`ingInc[]=${ingredientName}`).then(res=>{
            this.setState({desserts: res.data.desserts})
        })
    }
    render(){
        let smoothies = this.state.desserts.length;
        return( 
            <div className="ingredient-page"> 
                <Header pageName={this.props.ingredient.ingredientName} smoothies={smoothies}/> 

                <Row className="desserts" xs={1} sm={2} md={3}>
                    {this.state.desserts.map(d=>
                    <Col key={d.name} >
                        <DessertItem variant="short" key={d.dessert_id} dessert={d}/>
                    </Col>    
                    )}
                </Row>
            </div>
        )
    }
}

export default Ingredient;