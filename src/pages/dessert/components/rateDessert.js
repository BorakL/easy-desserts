import React from 'react';
import { BsStarFill } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { GiVomiting } from "react-icons/gi";
import { FiThumbsDown,FiMeh, FiThumbsUp } from "react-icons/fi";
import { GrAchievement } from "react-icons/gr";
import { AuthContext } from "../../../context/context";

// import './rateDessert.css';
import '../dessert.css';
import { postAssessment } from '../../../services/services';


 
class RateDessert extends React.Component{
    static contextType = AuthContext;
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
        let data = {
            assessment: this.state.selectedValue,
            dessert_id: this.props.dessert_id,
            user_id: this.context.user.user_id
        }        
        postAssessment(data).then(res=>{
            console.log(res.data.message)
        })
        console.log(data)
        this.props.setModalMessage("Thanks for adding your feedback")
        this.setState({selectedValue:0, comment:"", checked:false })
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
             <AuthContext.Consumer>
                 {
                     (auth)=>(
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
                                            <>
                                                {new Array(5).fill(1).map((v,i)=>
                                                <label className="stars" key={i}>
                                                    {i+1<=this.state.selectedValue ? 
                                                    <BsStarFill /> : 
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
                                                </>
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
             </AuthContext.Consumer>

           
 
        )
    }
}

export default RateDessert;