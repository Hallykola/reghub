import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';


import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

class GroupRow extends Component {
    state = {  } 
    values = this.props.values;
    // handleinput=(e)=>{
    //     const myform = {...this.state.myform};
       
    //     if(e.target.name == 'department'){
    //       myform[e.target.name] = e.target.value.split(",").map((value, i)=>value.trim());
    //     }else{
    //       myform[e.target.name] = e.target.value;
    //     }
    //     this.setState({myform},()=>{
    //       if(e.target.name !=='label'){
    //         this.props.sendvalues(this.state.myform)
    //       }
    //       console.log(this.state.myform)});
    // }
    
    delete=(e,course,group,groupno)=>{
        e.preventDefault();
        toast("Group for delete");
        var atoken = localStorage.getItem('token');
        const baseURL = `http://localhost:8004/grouptables/delete?course=${course}&group=${group} &groupno=${groupno}`
        ; 
  
        axios.get(baseURL,{headers: {
          'token': `${atoken}`
        }}
          ).then((response) => {
          console.log(response);
         
          toast("Group deleted");
          window.location.reload(false);
          // toast(response.data.token);
          // localStorage.setItem('token',response.data.token);
          // window.location.href = '/'
      
        }).catch((e)=>{
          console.log(e.response);
          // window.location.href = '/'
          if(e.response.data['error']){
            toast(e.response.data['error']);
          }else{
            for (let a in e.response.data){
              toast(e.response.data[a.toString()][0]);
              console.log(e.response.data[a.toString()][0]);
             }
          }
          
           
        });
    
    }

    exempt = ['id','group','created_at','updated_at','course','groupno']
    render() { 
        var cells=[];
        for (const [key,value] of Object.entries(this.values) ){
            if(!this.exempt.includes(key) ){
                cells.push(
                    <td>
                    <label for={key} class="form-label">{key}</label>
                    <input type="name" class="form-control" id={key} name={key} onChange={this.props.sendvalue} value={this.props.values[key]}/>
                    </td>
                );
            }
          
        }
        return (
            <React.Fragment>
                <tr>
                  <td>{`${this.values.group} ${this.values.groupno} `}
              </td>

                    
                    {cells}
                   <button  onClick={(e)=>this.delete(e,this.values.course,this.values.group,this.values.groupno)}>delete row</button>
                    </tr>
                 
          
            </React.Fragment>
        );
    }
}
 
export default GroupRow;