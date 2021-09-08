import axios from 'axios';

export const baseUrl = "http://localhost";

const getToken = () => {
    const token = sessionStorage.getItem("Token");
    const data = { headers: { Authorization: `Bearer ${token}` } }; 
    return data
}

export const getIngredients = (id)=>{
    return axios.get(`${baseUrl}/api/ingredients/${id}`);
}

export const getIngredientsCategories = ()=>{
    return axios.get(`${baseUrl}/api/ingredientsCategories`);
}

//getDessertsByCategory
export const getDesserts = (category_id,params='')=>{
    return category_id ? axios.get(`${baseUrl}/api/categories/${category_id}?${params}`) : 
    axios.get(`${baseUrl}/api/desserts?${params}`)
}

/////
export const getPopularDesserts = ()=>{
    return axios.get(`${baseUrl}/api/desserts?items_num=4&sort=rating&order=desc`)
}
////

export const getCategories = ()=>{   
    return axios.get(`${baseUrl}/api/categories`);
} 

export const getDessert = (dessert_id)=>{
    return axios.get(`${baseUrl}/api/desserts/${dessert_id}`);
} 

export const getIngredient = (ingredient_id)=>{
    return axios.get(`${baseUrl}/api/ingredient/${ingredient_id}`);
}

export const register = (data)=>{
    return axios.post(`${baseUrl}/api/register/`, data, {headers: { 'Content-Type': 'application/json'}} );
}

export const login = (data)=>{
    return axios.post(`${baseUrl}/api/login/`, data, {headers: { 'Content-Type': 'application/json'}});
}

export const postCreateDessert = (data)=>{
    return axios.post(`${baseUrl}/api/createDessert`, data, getToken());
}

export const postDessertPhoto = (data)=>{
    let options = {headers: {...getToken()['headers'],'Content-Type': 'multipart/form-data'}};
    return axios.post(`${baseUrl}/api/addDessertPhoto`, data, options);
}

export const postComment = (data)=>{
    return axios.post(`${baseUrl}/api/postComment`, data, getToken());
}

export const postAssessment = (data)=>{
    return axios.post(`${baseUrl}/api/postAssessment`, data, getToken());
}

export const getUser = ()=>{
    return axios.get(`${baseUrl}/api/user/profile`, getToken());
}

export const deleteDessert = (data)=>{
    return axios.post(`${baseUrl}/api/deleteDessert`, data, getToken());
}