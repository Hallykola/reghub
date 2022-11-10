import React, { Component } from 'react'
class EditGroupTile extends Component {
    state = { myform:{'label':this.props.label,'department':Array.isArray(this.props.departments)? this.props.departments.join(','):this.props.departments} } 
    handleinput= (e)=>{
        const myform = {...this.state.myform};
       
        if(e.target.name == 'department'){
          myform[e.target.name] = e.target.value.split(",").map((value, i)=>value.trim());
        }else{
          myform[e.target.name] = e.target.value;
        }
        this.setState({myform},()=>{
          if(e.target.name !=='label'){
            this.props.sendvalues(this.state.myform)
          }
          console.log(this.state.myform)});

      }
      

    render() { 
        return (
            <>
            <div class="col-md-6">
            <label for="inputname" class="form-label">Group Label {this.props.obj} </label>
            <input type="coursename" class="form-control" id="inputname" onBlur={this.handleinput} disabled name="label"  value={this.state.myform.label}/>
          </div>
          {/* <div class="col-md-6">
            <label for="inputmatricno" class="form-label"> Number per group</label>
            <input type="coursetitle" class="form-control" id="inputmatricno" onChange={this.handleinput} pattern="[0-9]*"  name="numberpergroup" value={this.props.numberpergroup}/>
          </div> */}
          <div class="col-md-12">
            <label for="inputname" class="form-label">Department/Identifier</label>
            <input type="coursename" class="form-control" id="inputname" onChange={this.handleinput} name="department" value={this.state.myform.department}/>
          </div>
          <button type="button" onClick={()=>this.props.adelete(this.state.myform.label)} disabled> Remove Group</button>

          </>
        );
    }
}
 
export default EditGroupTile;