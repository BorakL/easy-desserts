import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { baseUrl } from '../../services/services';
import './welcome.css';

class Welcome extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <>
            {this.props.location.pathname==="/" && 
            <div 
                className="welcome"
                style={{"backgroundImage":`url(${baseUrl}/assets/images/welcome/welcome.jpg)`}}
            >
                <h1>Fruit Smoothies</h1>
                <p>Banana, strawberry, and dozens more fruit smoothie recipes. <br/>Find a new healthy breakfast or snack today!</p>
                <Link className="btn" to="/smoothies">See all smoothies</Link>
            </div>
            }
            </>
        )
    }
}

export default withRouter(Welcome);