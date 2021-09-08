import React from 'react';
import BreadCrumbNav from '../breadCrumbNav/breadCrumbNav';

class Header extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let smoothies = this.props.smoothies;
        return(
            <div className="header">
                <BreadCrumbNav pageName={this.props.pageName} prevPageName="Smoothies" />
                <h2>{this.props.pageName}</h2>
                <p>{smoothies} {smoothies===1 ? "Smoothie" : "Smoothies"}</p>
            </div>
        )
    }
}

export default Header;