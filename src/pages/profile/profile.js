import React from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import { AuthContext } from '../../context/context';
import {  deleteDessert, getDesserts, getUser } from '../../services/services';
import {BsFillTrashFill} from 'react-icons/bs';
import './profile.css';  
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { confirmAlert } from 'react-confirm-alert';


class Profile extends React.Component{
    static contextType = AuthContext;
    constructor(props){
        super(props);
        this.state={
            user:{
                username:"",
                forename:"",
                surname:"",
                birthYear:null,
                favoriteDesserts:[]
            },
            yourDesserts:[]
        }
        this.deleteDessert = this.deleteDessert.bind(this);
    }

    componentDidMount(){
        getUser().then(res=>{
            this.setState({user:res.data});
            getDesserts(null,`author=${res.data.username}`).then(r=>{
                this.setState({yourDesserts:r.data.desserts})
            }).catch(err=>{
                console.log("error: ",err)   
            });
        });
    }
 

    deleteDessert(id){
        let yourDesserts = this.state.yourDesserts.filter(d=>d.dessert_id!==id);
        let index = this.state.yourDesserts.findIndex(d=>d.dessert_id===id);
        let dessertName = this.state.yourDesserts[index].name;
        confirmAlert({ 
            message: `Are you sure want to delete ${dessertName}?`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    deleteDessert({id:id}).then(res=>{
                        if(res.data.success){
                            this.setState({yourDesserts:yourDesserts});
                            alert(`Dessert ${dessertName} was successfully deleted`);
                        }
                    })    
                }
              },
              {
                label: 'No',
                onClick: () => {return}
              }
            ]
          }); 
    }
     
    render(){  
        return(
            <div className="profile">
                <div className="header">
                   <h1>{this.state.user.username}</h1> 
                   <p>{this.state.user.forename} {this.state.user.surname} {new Date().getFullYear() - this.state.user.birthYear}</p>
                </div>
                <div className="desserts">

                    <h2>Your favorite smoothies</h2>
                    {this.state.user.favoriteDesserts.length===0 ? <p>{"You don't have any favorite smoothie."}</p> : 
                    <ListGroup>
                        {this.state.user.favoriteDesserts.map(f=>
                            <ListGroup.Item key={f.dessert_id}> <Link to={`smoothie/${f.dessert_id}`}> {f.name} </Link> </ListGroup.Item>    
                        )}
                    </ListGroup>
                    }

                    <h2>Your smoothies</h2> 
                    {this.state.yourDesserts.length===0 ? <p>{"You haven't made any smoothie yet."}</p> : 
                    <ListGroup>
                    {this.state.yourDesserts.map(y=>
                        <ListGroup.Item key={y.dessert_id}> <Link to={`smoothie/${y.dessert_id}`}> {y.name} </Link> <BsFillTrashFill className="btn trash" onClick={()=>this.deleteDessert(y.dessert_id)}/> </ListGroup.Item>                        
                    )}
                    </ListGroup>
                    } 
                </div> 
                <Col className="text-center">
                    <Link to="create" className="btn btn-primary">Add New Smoothie</Link>
                </Col>
                                 
            </div>        
            )
    }
}

export default Profile;