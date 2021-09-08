import React from 'react';
import RateDessert from './rateDessert'; 
import { Container, Row, Col} from 'react-bootstrap';
// import Rating from '../../rating/rating';
import Rating from '../../../components/rating/rating';
import { GiCook } from 'react-icons/gi';
import {AiFillEye} from 'react-icons/ai';
import { Link,withRouter } from 'react-router-dom';
// import './header.css';
import '../dessert.css';
import BreadCrumbNav from '../../../components/breadCrumbNav/breadCrumbNav';
import { AuthContext } from '../../../context/context'; 

class Header extends React.Component{
    static contextType = AuthContext;
    constructor(props){
        super(props);
        this.state={
            modalShow:false,
            submited:false,
            message:""
        }
        this.closeModal=this.closeModal.bind(this);
        this.setModalMessage=this.setModalMessage.bind(this);
        this.openModal=this.openModal.bind(this);
    } 
    openModal(){
        if(!this.context.isAuth()) this.props.history.push("/login");
        else{this.setState({modalShow:true})}
    }
    closeModal(){
        this.setState({
            modalShow:false, message:""
        })
    }
    setModalMessage(message){
        this.setState({
            message:message
        })
    }
    render(){
        return(
            <AuthContext.Consumer>
            {
                (auth)=>(
                <>
                <Container fluid className="header">
                    <Row xs={1}>
                        <Col><BreadCrumbNav pageName={this.props.name} prevPageName="Category" prevPageRef={this.props.prevPageRef}/></Col>
                        <Col><h1>{this.props.name}</h1></Col>
                        <Col className="header-rating"> 
                            <div onClick={this.openModal}><Rating rating={this.props.rating}/></div>
                            <div className="views"><AiFillEye/> {this.props.views}</div>  
                        </Col>
                        <Col>{this.props.intro}</Col>
                        <Col className="author">
                            <Link to={`/author/${this.props.author}`}> <GiCook/> By {this.props.author} </Link>
                        </Col>
                    </Row>
                </Container> 
                
                <RateDessert 
                    dessert_id={this.props.dessert_id}
                    show={this.state.modalShow} 
                    onHide={this.closeModal} 
                    message={this.state.message} 
                    setModalMessage={this.setModalMessage}
                    title={this.props.name}
                />            
                </>
                )
            }
            </AuthContext.Consumer>
        )
    }
}

export default withRouter(Header);