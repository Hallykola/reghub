import jwt_decode from "jwt-decode";

const getData = ()=>{
    const rawtoken = localStorage.getItem('token');
    var token = jwt_decode(rawtoken);
    console.log(token);
    const data = token.sub;
    return data; 
    //  this.setState({name:myname});
  }
  
  
export{
    getData
}