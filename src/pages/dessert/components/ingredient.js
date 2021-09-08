import React from 'react';
import {Col, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {BiCheckbox} from 'react-icons/bi';
import {BiCheckboxChecked} from 'react-icons/bi'; 
import '../dessert.css';
import { baseUrl } from '../../../services/services';
import { formatMeasureUnit } from '../../../utilities/utilities';

class Ingredient extends React.Component{
    constructor(props){
        super(props);
        this.state={
            ingredientCheck:false
        }
        this.checking = this.checking.bind(this);
    }
    checking(){
        this.setState({ingredientCheck:!this.state.ingredientCheck});
    }
    render(){
        let description = this.props.data.description ? this.props.data.description : "";
        let measure = formatMeasureUnit(this.props.data.quantity,this.props.data.measure);
        let optional = this.props.data.optional;
        let link = `/ingredient/${this.props.data.name}`; 
        return( 
            <Col>
                <Card className="flex-row ingredient">
                    <Link to={link}><Card.Img src={`${baseUrl}/assets/images/Ingredients/${this.props.data.image}.jpg`} alt={`${this.props.data.image}`}></Card.Img></Link>
                    <Card.Body>
                       <Card.Title>
                        <Link to={link}>
                            {`${description} ${this.props.data.name} ${optional==="optional" ? "(optional)": ""}`}
                        </Link>
                       </Card.Title>
                       <Card.Text>{`${this.props.data.quantity} ${measure}`}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <div className="checkBox" onClick={this.checking}>{this.state.ingredientCheck ? <BiCheckboxChecked/> : <BiCheckbox/>}</div>
                    </Card.Footer>
                </Card>
            </Col>  
        ) 
    }
}

export default Ingredient;