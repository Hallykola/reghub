import React, { Component } from 'react';
import HomeBody from './mycomponents/homebody';
import Navbar from './mycomponents/navbar';

class Home extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
            <Navbar/>
            <HomeBody/>
            </React.Fragment>
        );
    }
}
 
export default Home;


