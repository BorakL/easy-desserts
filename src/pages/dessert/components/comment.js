import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { formatDateTime } from '../../../utilities/utilities';

class Comment extends React.Component{
    render(){
        let date = formatDateTime(this.props.comment.date);
        return(
            <Container fluid className="comment">
                <Row>
                    <Col className="comment-head">
                        <div><b>{this.props.comment.username}</b></div>
                        <div>{date}</div>
                    </Col>
                </Row>
                <Row>
                    <Col className="comment-body">{this.props.comment.content}</Col>
                </Row>
            </Container>     
        )
    }
}

export default Comment;