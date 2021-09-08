import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { baseUrl, getDessert } from '../../services/services';
import './dessert.css'; 
import DessertSection from './components/dessertSection';
import NutritionFacts from './components/nutritionFacts';
import Ingredient from './components/ingredient';
import Info from './components/info';
import Header from './components/header';
import Loader from '../../components/loader/loader';
import Comment from './components/comment';
import CommentForm from './components/commentForm';

class Dessert extends React.Component{
    constructor(props){
        super(props)
        this.state={
            dessert:null,
            loading:true
        }
    }
    componentDidMount(){
        getDessert(this.props.dessert.dessertId).then(res=>{
            this.setState({dessert:res.data}); 
        }).then(()=>{setTimeout(()=>{this.setState({loading:false})},100)}) 
    }
    render(){
        return(
            <>
            {this.state.loading ? <Loader/> : 
            <> 
            <Header 
                dessert_id={this.props.dessert.dessertId}
                name={this.state.dessert.name} 
                intro={this.state.dessert.intro}
                author={this.state.dessert.author.username}
                views={this.state.dessert.views}
                rating={this.state.dessert.rating}
                prevPageRef={this.state.dessert.category}
            />
            <Container fluid className="dessert-img">
                <Image 
                    src={`${baseUrl}/assets/uploads/${this.state.dessert.name}.jpg`} 
                    alt={`${this.state.dessert.name}`}
                    title={`${this.state.dessert.name}`}
                /> 
            </Container>
            <DessertSection md="2" lg="2" title="Ingredients">
                {this.state.dessert.ingredients.map(i=><Ingredient key={i.name} data={i}/> )}
            </DessertSection> 
            <DessertSection title="Directions">
                <Col>
                {this.state.dessert.recipe}                
                </Col>
            </DessertSection>
            <DessertSection title="Info">
                <Info info={this.state.dessert.info}/>
            </DessertSection>
            <DessertSection title="Nutrition Facts">
                <NutritionFacts nutritionFacts={this.state.dessert.nutritionFacts}/>
            </DessertSection> 
            <Container fluid className="comments-section">
                <Row xs={1}>
                    <Col className="comments-header">
                        <h2>Comments ({this.state.dessert.comments.length})</h2>
                        <CommentForm dessertId={this.props.dessert.dessertId}/>
                    </Col>
                    <Col className="comments-body">
                        {this.state.dessert.comments.map(c=><Comment key={c.comment_id} comment={c}/>)}
                    </Col>
                </Row>
            </Container> 
            </>
            }
            </>
        )
    }
}

export default Dessert;