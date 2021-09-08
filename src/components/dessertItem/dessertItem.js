import React from 'react';
import {Col, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { baseUrl } from '../../services/services';
import Rating from '../rating/rating';
import './dessertItem.css';

class DessertItem extends React.Component{
    constructor(props){
        super(props)
    }
    render(){ 
        let linkDessert = `/smoothie/${this.props.dessert.dessert_id}`;
        let linkAuthor = `/author/${this.props.dessert.username}`;
        let image = `${baseUrl}/assets/uploads/${this.props.dessert.name}.jpg`;
        return(
            
            <Col>
                <Card className="dessertItem">
                    <Link to={linkDessert}>
                        <Card.Img variant="top" src={image} title={this.props.dessert.name}/>
                    </Link>
                    <Card.Body>
                        <Card.Title>
                            <Link to={linkDessert}>{this.props.dessert.name}</Link>
                        </Card.Title>
                        <Rating rating={this.props.dessert.rating}/>
                        {
                            this.props.variant==="full" && <Card.Text className="intro">{this.props.dessert.intro}</Card.Text>
                        }
                    </Card.Body>
                    <Card.Footer>
                        <Link to={linkAuthor}><small className="text-muted">By <b>{this.props.dessert.username}</b></small></Link>
                    </Card.Footer>
                </Card> 
            </Col>
        )
    }
}

export default DessertItem;