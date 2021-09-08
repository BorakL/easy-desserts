import React from 'react';

class Loader extends React.Component{
    render(){
        let style={
            position:'fixed',
            top:'0',
            bottom:'0',
            left:'0',
            right:'0',
            backgroundColor:'white',
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
        }
        return(
            <div style={style}>
                <img src="/images/loader.gif"/> 
            </div>
        )
    }
}

export default Loader;