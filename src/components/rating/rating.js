import React from 'react';
import { BsStarFill } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
import { v4 as uuidv4 } from 'uuid';
import './rating.css';

class Rating extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let rating = this.props.rating===null ? 0 : this.props.rating; 
        return(
            <>
            {(rating>=0 && rating<=5) && 
                (
                    <div className="rating"> 
                        <div className="ratingStars">
                            {new Array(Math.round(rating)).fill(null).map(r=><BsStarFill key={uuidv4()}/>)}
                            {new Array( 5- Math.round(rating)).fill(null).map(r=><BsStar key={uuidv4()}/>)}
                        </div>
                        <div>
                            {rating===0 ? "" : parseFloat(rating).toFixed(1)}   
                        </div>
                    </div>
                )
            }
            </>
        )
    }
}

export default Rating;