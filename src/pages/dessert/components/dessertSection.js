import React from 'react';
import { FaClock, FaUtensilSpoon, FaListUl, FaChartBar} from 'react-icons/fa'; 
import { Container, Row } from 'react-bootstrap';
// import './dessertSection.css';
import '../dessert.css';
 
class DessertSection extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let icon="";
        switch(this.props.title){
            case "Info":
            icon = <FaClock/>
            break;
            case "Ingredients":
            icon = <FaListUl/>
            break;
            case "Directions":
            icon = <FaUtensilSpoon/>
            break;
            case "Nutrition Facts":
            icon = <FaChartBar/>
            break;
        }
        let xs = this.props.xs ? this.props.xs : 1;
        let md = this.props.md ? this.props.md : 1;
        let lg = this.props.lg ? this.props.lg : 1;

        return( 
            <Container fluid className="dessert-section">
                <div className="dessert-section-icon">{icon}</div>
                <h3 className="dessert-section-title">{this.props.title}</h3> 
                <Row xs={xs} md={md} lg={lg} className="dessert-section-body"> 
                    {/*Ovde se unosi sadržaj u vidu kolona*/}
                    {this.props.children}
                </Row>
            </Container>
        )
    }
}

export default DessertSection;