import React from 'react';
import {Form, Button} from 'react-bootstrap';

class SearchFormSort extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.props.handleChange(e);
    }

    render(){
        return(
            <Form.Group className="search-form-sort">
                <Form.Select onChange={this.handleChange} name="sortBy" aria-label="Default select example" style={{"width":"250px"}}>
                    <option>Sort by</option>
                    <option value="name">Name</option>
                    <option value="calories">Calories</option>
                    <option value="rating">Rating</option>
                </Form.Select> 
                <Form.Select onChange={this.handleChange} name="order" aria-label="Default select example" style={{"width":"250px"}}>
                    <option>Order</option>
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option> 
                </Form.Select> 
                
                <Button as="input" type="submit" value="Search"/> 
            </Form.Group> 
        )
    }
}

export default SearchFormSort;