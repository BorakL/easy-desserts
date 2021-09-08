import React from 'react';
import {Navbar, Container, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import {AuthContext} from '../../context/context';
import { withRouter } from 'react-router-dom';
import {SiBlender} from 'react-icons/si';

class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.routeChange = this.routeChange.bind(this); 
    } 

    routeChange(e){
        let path=`/${e.target.title}`; 
        this.props.history.location.pathname !== path && this.props.history.push(path);
    }

    render(){
        return(
            <AuthContext.Consumer>
                {
                (auth)=>( 
                <Navbar expand="lg" variant="light" className="sticky-top navbar">
                    <Container >
                        <Navbar.Brand href="/"><SiBlender/> Fruit Smoothies</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#features">About</Nav.Link>
                            </Nav>
                            <Nav>
                                <NavDropdown title={auth.isAuth() ? auth.user.username : "Join Now"} id="collasible-nav-dropdown">
                                    <Dropdown.Header>Account</Dropdown.Header>
                                    {auth.isAuth() ? (
                                    <>
                                    <NavDropdown.Item title="profile" onClick={this.routeChange}>Your Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={auth.userLogout}>Logout</NavDropdown.Item>
                                    </>
                                    )
                                    :
                                    <NavDropdown.Item title="register" onClick={this.routeChange}>Create Profile</NavDropdown.Item>
                                    }
                                
                                </NavDropdown>

                                {/* Login dugme za neulogovane */}
                                {!auth.isAuth() && <Nav.Link title="login" onClick={this.routeChange}>Login</Nav.Link>}
                                
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>   
                )
                }
            
            </AuthContext.Consumer>
        )
    }
}

export default withRouter(NavBar);