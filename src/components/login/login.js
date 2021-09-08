import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { login } from '../../services/services';
import { AuthContext } from '../../context/context'; 
import { Link, Redirect, withRouter } from 'react-router-dom';

class Login extends React.Component{
    static contextType = AuthContext;

    constructor(props){
        super(props);
        this.state={
            data:{
                username:"",
                password:""
            },
            message:"",
            success:false 
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    handleChange(e){
        this.setState( { data:{...this.state.data, [e.target.name]:e.target.value} } )
    }
    handleSubmit(e){
        e.preventDefault(); 
        login(this.state.data).then(res=>{ 
            if(res.data.success)this.context.userLogin(res.data.jwt);
            this.setState({message:res.data.message, success:res.data.success})
            
        });
        
    }
 
    render(){

           return(

            <AuthContext.Consumer>
                {(auth)=>(
                    <>
                    {auth.isAuth() && <Redirect to="/"/>}
                    
                    {this.state.message!=="" && <Alert variant={this.state.success ? "success" : "danger"}>{this.state.message}</Alert>}
                    <Form onSubmit={this.handleSubmit}>
                       <h2>Login</h2> 
                       <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" 
                                    name="username" 
                                    placeholder="Username"
                                    onChange={this.handleChange}
                                    value={this.state.data.username}
                                    required   
                            />

                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" 
                                    name="password" 
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                    value={this.state.data.password}
                                    required   
                            />
                        </Form.Group>
                        <Button type="submit">Submit</Button>
                        <br/>
                        <p style={{"textAlign":"center"}}><Link to="/register"><u>Create account</u></Link></p>
                    </Form> 
                    </>
                )}
            </AuthContext.Consumer>
        )
    }
}

export default withRouter(Login);



