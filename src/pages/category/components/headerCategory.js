import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Style from 'style-it';
import BreadCrumbNav from '../../../components/breadCrumbNav/breadCrumbNav';

class HeaderCategory extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let photo = this.props.category ? this.props.category.photo : "allFruits.png";
        let name = this.props.category ? this.props.category.name : "All recipes";
        return Style.it(`
                .bgFruit{
                    background-image: url("${this.props.baseUrl}/assets/images/${photo}")
                }
                /* Small devices (landscape phones, 576px and up) */
                @media (max-width: 576px) {  
                    .category-header .heading{
                        background-image: url("${this.props.baseUrl}/assets/images/${photo}");
                        text-align: center;  
                    }  
                } 
            `
            ,
            <Container fluid className="category-header">
                <Row className=" g-0"> 
                    <Col className="text" xs={12} sm={4}>
                        <Row xs={1}>
                            <Col><BreadCrumbNav pageName="Category"/></Col>
                            <Col className="heading">  
                                <h1>{name}</h1>
                                <p>{this.props.number} recipes</p>  
                            </Col>
                        </Row>
                    </Col>
                    <Col className="image d-none d-sm-block bgFruit" sm={8}> </Col>
                </Row>
            </Container>
        )
    }
}

export default HeaderCategory;