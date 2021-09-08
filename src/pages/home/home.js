import React from 'react';
import { getCategories, getPopularDesserts, baseUrl, getDessert, getDesserts } from '../../services/services'; 
import { Row, Col, Container, Image } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import './home.css';
import DessertItem from '../../components/dessertItem/dessertItem';

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={
            categories:[],
            popularDesserts:[],
            hover:false
        } 
    }
    componentDidMount(){
        getCategories().then(res=>{
            this.setState({categories:res.data.categories})
        }) 
        getDesserts(null,"items_num=4&sort=rating&order=desc").then(res=>{
            this.setState({popularDesserts: res.data.desserts});
        })
    } 

    render(){ 
        return(
        <Container fluid className="home"> 
        
        <Row xs={1} md={2} className="categories-menu g-0">
            {this.state.categories.map(c=>
                <Col key={c.category_id}>
                    <Link  key={c.name} to={`/category/${c.category_id}`}
                        className="category" 
                        onMouseOver={this.isHover}
                        onMouseLeave={this.isHover}
                        style={{ "backgroundImage":`url(${baseUrl}/assets/images/${c.photo})` }}
                    >
                        <span className="category-name">
                            {c.name}
                        </span>
                    </Link>
                </Col>
            )}
        </Row> 
        
        <div className="banner"> 
            <Link to={{pathname: "https://www.amazon.com/Healthy-Smoothie-Recipe-Book-Match/dp/1623156718/ref=pd_vtp_4/140-4254599-2921754?pd_rd_w=lgZMR&pf_rd_p=016e3697-91be-4dc2-9533-ef9350e7e73d&pf_rd_r=Y5QNEZPVV6H7WV8FPB0E&pd_rd_r=f30a05ae-9d0b-4593-8398-faaa615cde2f&pd_rd_wg=fxdmU&pd_rd_i=1623156718&psc=1"}} target="_blank">
                <Image src={`${baseUrl}/assets/images/banners/recipeBook.jpg`} title="banner image"/>
            </Link>
        </div>

        <h2>Top rated smoothies</h2>
        <Row  xs={1} sm={2} lg={4}>
            {typeof this.state.popularDesserts!=="undefined" && this.state.popularDesserts.map(d=>
                <Col key={d.name} >
                    <DessertItem variant="short" key={d.dessert_id} dessert={d}/>
                </Col>    
            )}
        </Row> 

        <div className="banner">
        {/* <iframe frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"width="788.54" height="443" type="text/html" src="https://www.youtube.com/embed/YuDhbLQtt2k?autoplay=0&fs=1&iv_load_policy=3&showinfo=1&rel=1&cc_load_policy=0&start=0&end=0&origin=http://youtubeembedcode.com"><div><small><a href="https://youtubeembedcode.com/nl/">youtubeembedcode.com/nl/</a></small></div><div><small><a href="https://www.unorules.org/skip-bo-rules/">skip-bo rules</a></small></div></iframe>*/}
        </div> 

        </Container>
        )
    }
}

export default withRouter(Home);