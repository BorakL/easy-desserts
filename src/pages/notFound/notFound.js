import React from 'react';
import { Image } from 'react-bootstrap';


export const NotFound = ()=>{
    let myStyle = {
        "display":"flex",  
        "justify-content":"center",
        "padding-top":"calc(50vh - 300px)"
    }
    return (
    <div style={myStyle}>
        <Image src="/images/404.gif" alt="not found"/> 
    </div>
    )
}