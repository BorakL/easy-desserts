import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { AuthContext } from '../../../context/context';
import { Link } from 'react-router-dom';
import { postComment } from '../../../services/services';

class CommentForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            comment:""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        postComment({...this.state, dessert_id:this.props.dessertId}).then(res=>{
            console.log(res.data.message)
        })
        this.setState({comment:""})
    }
    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    render(){   
        return(
            <AuthContext.Consumer>
                {
                    (auth)=>(
                    <>
                    {
                    auth.isAuth() ? 
                    
                        <Form className="comment-form" onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Label>{auth.user.username}</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    onChange={this.handleChange} 
                                    name="comment"
                                    value={this.state.comment}
                                    placeholder="Comment"
                                />
                            </Form.Group>
                            <Button type="submit" disabled={this.state.comment===""}>Submit</Button>
                        </Form>

                    : 
                    
                        <Link to="/login">
                            <Button>Leave Comment</Button>
                        </Link>
                    }
                    </>
                    )
                }
            </AuthContext.Consumer>
        )
    }
}

export default CommentForm;