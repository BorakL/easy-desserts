import React from 'react';
import { Col, Row } from 'react-bootstrap';
import DessertItem from '../../components/dessertItem/dessertItem';
import Header from '../../components/header/header';
import { getDesserts } from '../../services/services';

class Author extends React.Component{
    constructor(props){
        super(props);
        this.state={
            desserts:[]
        }
    }
    componentDidMount(){
        getDesserts(null,`author=${this.props.author.authorName}`).then(res=>{
            this.setState({desserts:[...res.data.desserts]})
        })
    }
    render(){
        let smoothies = this.state.desserts.length;
        return(
            <div className="author-page"> 
                
                <Header pageName={this.props.author.authorName} smoothies={smoothies}/> 

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

export default Author;