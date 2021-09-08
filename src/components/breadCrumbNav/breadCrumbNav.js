import React from 'react';
import {Link} from 'react-router-dom';

class BreadCrumbNav extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let pageName = this.props.pageName;
        let prevPageName = this.props.prevPageName;
        let prevPageRef = this.props.prevPageRef;
        return(
            <div>
                <Link to={'/'}>Home</Link> 
                <Link to={`/${prevPageName}/${prevPageRef ? prevPageRef : ""}`}> {prevPageName && ' / '}{prevPageName} </Link>
                 / {pageName}
            </div>
        )
    }
}

export default BreadCrumbNav;