import React from "react";
import jwt_decode from "jwt-decode";

const AuthContext = React.createContext();
   
class AuthProvider extends React.Component{
  constructor(props){
    super(props);
    this.state={
      user:{
        username:"",
        user_id:null
      }
    }
    this.userLogin = this.userLogin.bind(this);
    this.userLogout = this.userLogout.bind(this);
  }
  componentDidMount(){
    if(this.isAuth()){
      let decoded = jwt_decode(sessionStorage.getItem("Token"));
      this.setState({user:{username:decoded.data.username, user_id:decoded.data.user_id}})
    }
  }

  isAuth(){
    const token = sessionStorage.getItem("Token");
    return token !== null && token !== "";
  } 
  userLogin(jwt){
    sessionStorage.setItem("Token", jwt); 
    let decoded = jwt_decode(jwt);
    this.setState({user:{username:decoded.data.username, user_id:decoded.data.user_id}})
  }
  userLogout(){
    sessionStorage.removeItem("Token");
    this.setState({user:null})
  }
  
  
  render(){
    const auth = {
      user:this.state.user,
      isAuth: this.isAuth,
      userLogin: this.userLogin,
      userLogout: this.userLogout
    }
    return(
      <AuthContext.Provider value={auth}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }

}
 

export { AuthProvider, AuthContext}