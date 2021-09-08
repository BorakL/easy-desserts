import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Container } from 'react-bootstrap';
import Category from './pages/category/category';
import Home from './pages/home/home';
import { Switch, Route } from 'react-router-dom'; 
import { NotFound } from './pages/notFound/notFound';
import Dessert from './pages/dessert/dessert';
import Desserts from './pages/desserts/desserts'; 
import Ingredient from './pages/ingredient/ingredient';
import Registration from './pages/registration/registration';
import Login from './components/login/login';
import { AuthProvider } from './context/context';
import PrivateRoute from './routes/privateRoute';
import NavBar from './components/navBar/navBar';
import { register } from './services/services';
import Profile from './pages/profile/profile';
import Author from './pages/author/author';
import CreateDessert from './pages/createDessert/createDessert';
import AddIngredients from './components/addIngredients/addIngredients';
import Footer from './components/footer/footer';
import Welcome from './components/welcome/welcome';
 
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NavBar/>
        <Welcome/>
        <Container fluid className="main">
           <Switch>
            <Route exact path="/category/:categoryId(\d+)" render={(routeProps)=><Category category={routeProps.match.params}/>} />
            <Route exact path="/smoothie/:dessertId(\d+)" render={(routeProps)=><Dessert dessert={routeProps.match.params}/>} />
            <Route exact path="/smoothies" render={(routeProps)=><Desserts desserts={routeProps.match.params}/>}/>
            <Route extct path="/ingredient/:ingredientName([A-z\s]+)" render={(routeProps)=><Ingredient ingredient={routeProps.match.params}/>} />
            <Route exact path="/author/:authorName([A-z\s]+)" render={(routeProps)=><Author author={routeProps.match.params}/>} />
            

            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Registration} />

            <PrivateRoute exact path="/create" component={CreateDessert}/> 
            
            <Route exact path="/addIngredients" component={AddIngredients}/>

            <PrivateRoute exact path="/profile" component={Profile}/>

            <Route exact path="/" render={()=><Home/>}/>
            <Route exact render={()=><NotFound/>}></Route>
            
          </Switch>
         
        </Container>
        
        <Footer/>
        
        </AuthProvider> 
    </div>
  );
}

export default App;
