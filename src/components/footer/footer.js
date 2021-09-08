import React from 'react';
import './footer.css';
import {AiFillFacebook, AiFillTwitterCircle, AiFillInstagram} from 'react-icons/ai';
import { Link } from 'react-router-dom';

function Footer(){ 
  return (
    <div className="footer">
        <div className="social-media-icons">
            <Link to={{pathname: "https://www.facebook.com/Fruit smoothies"}} target="_blank"> <AiFillFacebook/> </Link>
            <Link to={{pathname: "https://www.twitter.com/Fruit smoothies"}} target="_blank"> <AiFillTwitterCircle/> </Link>
            <Link to={{pathname: "https://www.instagram.com/Fruit smoothies"}} target="_blank"> <AiFillInstagram/> </Link>
        </div>

        <p> &copy;  Copyright FruitSmoothies. All Right Reserved.<br/>Powered by Luka Borak</p>
    </div>
    )
}

export default Footer;


