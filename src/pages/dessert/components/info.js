import React from 'react';
import {Col} from 'react-bootstrap';

class Info extends React.Component{
    render(){
        return(
            <>
            <Col>Time: {this.props.info.time} mins</Col>
            <Col>Servings: {this.props.info.servings}</Col>
            </>
        )
    }
}

export default Info;