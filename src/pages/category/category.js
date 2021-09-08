import React from 'react';
import SearchForm from '../../components/search-form/search-form';
import DessertItem from '../../components/dessertItem/dessertItem';
import {getCategories, getDesserts, baseUrl} from '../../services/services';
import {Row} from 'react-bootstrap';
import './category.css';
import { Redirect } from 'react-router-dom'; 
import { withRouter } from 'react-router-dom';  
import HeaderCategory from './components/headerCategory';
import Loader from '../../components/loader/loader';

class Category extends React.Component{
    constructor(props){
        super(props);
        this.state={
            category:null,
            desserts:[], 
            redirection:false,
            number:null, 
            loading:true
        }
        this.categoryId = this.props.category.categoryId;
        this.getDesserts = this.getDesserts.bind(this);
        this.params = this.props.location.search.substr(1);
    }
 
    componentDidMount(){ 
        getCategories().then(res=>{
            let idx = res.data.categories.findIndex(c=>c.category_id === this.categoryId);
            if(idx===-1)this.setState({redirection:true});
            this.setState({
                category: res.data.categories[idx], loading:false
            });
        })
        getDesserts(this.categoryId, this.params).then(res=>{ 
            this.setState({desserts: res.data.desserts}); 
        }) 
    }

    getDesserts(p){
        getDesserts(this.categoryId,p).then(res=>{
            this.setState({desserts: res.data.desserts});
        });  
    }

    render(){  
        return(
            <>
            {this.state.redirection && <Redirect to="/"/>}
            {this.state.loading && <Loader/>}
            {this.state.category && <HeaderCategory baseUrl={baseUrl} category={this.state.category} number={this.state.desserts.length}/> }
            <SearchForm getDesserts={this.getDesserts}/>
            <hr/>
            <Row xs={1} md={2} className="desserts-list">
            {this.state.desserts.map(d=>
                <DessertItem variant="full" key={d.dessert_id} dessert={d}/>
            )}
            </Row>
            </>
        )
    }
}

export default withRouter(Category);