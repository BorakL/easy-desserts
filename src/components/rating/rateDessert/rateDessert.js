import React from 'react';
import { BsStarFill, BsStar } from "react-icons/bs";
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { GiVomiting } from "react-icons/gi";
import { FiThumbsDown,FiMeh, FiThumbsUp } from "react-icons/fi";
import { GrAchievement } from "react-icons/gr";
import { v4 as uuidv4 } from 'uuid';

import './rateDessert.css';

 
class RateDessert extends React.Component{
     
    constructor(props){ 
        super(props);
        this.state={
            selectedValue:0,
            comment:"",
            checked:false
        }
        this.comments = [
            <GiVomiting/>,
            <FiThumbsDown/>,
            <FiMeh/>,
            <FiThumbsUp/>,
            <GrAchievement/>
        ];
        this.onClick = this.onClick.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setComment = this.setComment.bind(this);
        this.removeComment = this.removeComment.bind(this);
    }
    
    onClick(e){
        this.setState({selectedValue:e.target.value, checked:true, comment:this.comments[e.target.value-1] }) 
    } 
    handleSubmit(){
        this.setState({selectedValue:0, comment:"", checked:false })
        this.props.setmessage("Thanks for adding your feedback")
        //reset stejta
    }
    setComment(e){
        if(this.state.checked)return;
        this.setState({comment: this.comments[e.target.dataset.i]})
    }
    removeComment(){
        if(this.state.checked)return;
        this.setState({comment:""})
    }



    render(){
        return( 

            <Modal className="feedback"
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">{this.props.title} </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    
                    <Row className="rateDessert">  
                        {this.props.message !== "" ? <Col> {this.props.message}</Col> :
                        <>
                        <Col xs={8} md={6}>
                            <form>  
                                {new Array(5).fill(null).map((v,i)=>
                                <label  key={uuidv4()} className="stars">
                                    {i+1<=this.state.selectedValue ? 
                                    <BsStarFill/> : 
                                    <BsStar data-i={i} onMouseOver={this.setComment} onMouseLeave={this.removeComment}/>
                                    }
                                    <input
                                        type="radio" 
                                        onChange={this.onClick} 
                                        id={i+1} 
                                        value={i+1} 
                                        name="star"
                                    />                
                                </label>
                                )}  
                            </form> 
                        </Col>
                        <Col xs={4} md={6} className="icon"> {this.state.comment} </Col>     
                        </>        
                        } 
                    </Row>
                    
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.handleSubmit} disabled={this.state.selectedValue===0}>Submit</Button>
                </Modal.Footer>

            </Modal>
 
        )
    }
}

export default RateDessert;