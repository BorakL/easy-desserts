import React from 'react';
import {Form} from 'react-bootstrap';
import SearchFormIngredients from './search-form-ingredients/search-form-ingredients';
import SearchFormSort from './search-form-sort/search-form-sort'; 
import { withRouter } from 'react-router-dom';
import './search-form.css';

class SearchForm extends React.Component{  
    constructor(props){
        super(props);
        this.state={
            sortBy:"",
            order:"",
            numItem:null,
            includes:[],
            excludes:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.addInclude = this.addInclude.bind(this);
        this.addExclude = this.addExclude.bind(this);
        this.removeInclude = this.removeInclude.bind(this);
        this.removeExclude = this.removeExclude.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    } 
 
    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    addInclude(newInclude){
        if(this.state.includes.indexOf(newInclude)>-1 || this.state.excludes.indexOf(newInclude)>-1){
            alert("This ingredient has already been selected");
            return;
        }
        this.setState({includes: [...this.state.includes, newInclude]})
    }
    addExclude(newExclude){
        if(this.state.excludes.indexOf(newExclude)>-1 || this.state.includes.indexOf(newExclude)>-1){
            alert("This ingredient has already been selected");
            return;
        }
        this.setState({excludes: [...this.state.excludes, newExclude]})
    }
    removeInclude(include){
        let filtered = this.state.includes.filter(i=>i!==include); 
        this.setState({includes:filtered}); 
    }
    removeExclude(exclude){
        let filtered = this.state.excludes.filter(i=>i!==exclude); 
        this.setState({excludes:filtered});
    }
    handleSubmit(e){
        e.preventDefault();
        let result = '';
        result += this.state.sortBy ? 'sort='+this.state.sortBy+'&' : '';
        result += this.state.order ? 'order='+this.state.order+'&' : '';
        if(this.state.includes.length>0){
            this.state.includes.forEach(i => result += 'ingInc[]='+i+'&');
        }
        if(this.state.excludes.length>0){
            this.state.excludes.forEach(e => result += 'ingExcl[]='+e+'&');
        }
        result = result.replace(/\&$/,'');
        let path = this.props.location.pathname;
        this.props.history.push(path+'?'+result);
        this.props.getDesserts(result); 
    }

    render(){
        return( 
            <Form className="search-form" onSubmit={this.handleSubmit}> 
                <h4>Include these ingredients</h4>
                <SearchFormIngredients name="includes" add={this.addInclude} remove={this.removeInclude} ingredients={this.state.includes}/>
               
                <h4>Do not include these ingredients</h4>
                <SearchFormIngredients name="excludes" add={this.addExclude} remove={this.removeExclude} ingredients={this.state.excludes}/>
                
                <SearchFormSort handleChange={this.handleChange}/> 
            </Form>
        )
    }
}

export default withRouter(SearchForm);