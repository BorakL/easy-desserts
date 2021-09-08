import React from 'react';
import { Form, Button, Alert} from 'react-bootstrap';
import { register } from '../../services/services';


class Registration extends React.Component{
    constructor(){
        super();
        this.state={
            data:{
                email: "", 
                forename: "",
                surname: "",
                username: "",
                age: 18,
                password_1:"",
                password_2:""    
            },
            error:true,
            message:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({ data : {...this.state.data,[e.target.name]:e.target.value} })
    }
    handleSubmit(e){
        e.preventDefault();
        register(JSON.stringify(this.state.data)).then(res=>{
            this.setState({error:!res.data.success, message:res.data.message});
            if(res.data.success){
                this.setState({
                    data:{
                        email: "", 
                        forename: "",
                        surname: "",
                        username: "",
                        age: 18,
                        password_1:"",
                        password_2:""    
                    } 
                })
            }
        }).catch(err=>{
            console.log(err)
        }) 
    }

    render(){
        return(
            <>
            {this.state.message!=="" && <Alert variant={this.state.error ? "danger" : "success"}>{this.state.message}</Alert>}
            <Form onSubmit={this.handleSubmit}>
                <h2>Register</h2>
                <Form.Group> 
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text"
                                  placeholder="First Name" 
                                  name="forename" 
                                  value={this.state.data.forename}  
                                  onChange={this.handleChange} 
                                  required
                    />
                    
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" 
                                  placeholder="Last Name" 
                                  name="surname" 
                                  value={this.state.data.surname} 
                                  onChange={this.handleChange} 
                                  required
                    />
                    
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" 
                                  placeholder="Username" 
                                  name="username" 
                                  value={this.state.data.username} 
                                  onChange={this.handleChange} 
                                  required
                    />

                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" 
                                  placeholder="Email" 
                                  name="email" 
                                  value={this.state.data.email} 
                                  onChange={this.handleChange} 
                                  required
                    />
                    
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" 
                                  placeholder="Age" 
                                  min="1" 
                                  name="age" 
                                  value={this.state.data.age} 
                                  onChange={this.handleChange} 
                                  required
                    />

                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" 
                                  placeholder="Password" 
                                  name="password_1" 
                                  value={this.state.data.password_1} 
                                  onChange={this.handleChange} 
                                  required
                    />

                    <Form.Label>Repeat password</Form.Label>
                    <Form.Control type="password" 
                                  placeholder="Repeated password" 
                                  name="password_2" 
                                  value={this.state.data.password_2} 
                                  onChange={this.handleChange} 
                                  required
                    />
                </Form.Group>
                <Button variant="primary" type="submit"> Submit</Button>
            </Form>
            </>
        )
    }
}

export default Registration;
 