import React from 'react';
import { getDesserts } from '../../services/services';
import {Row, Col} from 'react-bootstrap';
import DessertItem from '../../components/dessertItem/dessertItem';
import SearchForm from '../../components/search-form/search-form';


class Desserts extends React.Component{
    constructor(props){
        super(props);
        this.state={
            desserts:[]
        }
        this.getDesserts = this.getDesserts.bind(this);
    }

    componentDidMount(){
        getDesserts().then(res=>{
            this.setState({desserts:[...res.data.desserts]})
        })
    }

    getDesserts(queryString){
        getDesserts(null,queryString).then(res=>{
            this.setState({desserts: [...res.data.desserts]});
        }); 
    } 

    render(){
        return(
            <>
            <h1>Smoothies Database</h1>
            <SearchForm getDesserts={this.getDesserts}/>
            <Row  xs={1} sm={2} md={3}>
            {this.state.desserts.map(d=>
                <Col key={d.name} >
                    <DessertItem variant="short" key={d.dessert_id} dessert={d}/>
                </Col>    
            )}
            </Row> 
            </>            
        )
    }
}

export default Desserts;