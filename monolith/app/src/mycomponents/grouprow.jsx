import React, { Component } from 'react';


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
    
    exempt = ['id','group','created_at','updated_at','course','groupno']
    render() { 
        var cells=[];
        for (const [key,value] of Object.entries(this.values) ){
            if(!this.exempt.includes(key) ){
                cells.push(
                    <td>
                    <label for={key} class="form-label">{key}</label>
                    <input type="name" class="form-control" id={key} name={key} onChange={this.props.sendvalue} value={value}/>
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
                    </tr>
                 
          
            </React.Fragment>
        );
    }
}
 
export default GroupRow;