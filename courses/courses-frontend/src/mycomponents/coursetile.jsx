import React, { Component } from 'react'

class CourseTile extends Component {
    state = {  } 
    render() { 

        return (
            <div  className='tileContainer' >
             {/* <a href="C:\Users\Owner\Desktop\coding\Registration\createnotice.html"><img class="staff img-fluid w-75" src="images/create a notice.png"/></a> */}
             
               <a href={'/courses?course='+ this.props.details.course }><h1 className='tileTitle'>
                    {this.props.details.course}
                </h1>
                </a>
            </div>
        );
    }
}
 
export default CourseTile;