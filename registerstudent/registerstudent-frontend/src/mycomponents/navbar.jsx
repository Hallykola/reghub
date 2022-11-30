import React, { Component } from 'react';

class Navbar extends Component {
    state = {  } 
    render() { 
        return (
            <nav className="navbar navbar-expand-lg bg-light fixed-top navbar-light mb-5">
            <div class="container">
                <a href="/" className="navbar-brand text-success fw-bold"> RegHub Register</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navmenu">
                    <ul class="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a href="/" className="nav-link text-info fw-bold">Home </a>
                        </li>
                        <li class="nav-item">
                            <a href="#FAQ" className="nav-link text-info fw-bold">About</a>
                        </li>
                        <li class="nav-item">
                            <a href="#Contact" className="nav-link text-info fw-bold">Help</a>
                        </li>
                        <li class="nav-item">
                            <a href="#Our Products" className="nav-link text-info fw-bold">Our Products</a>
                        </li>
                        <li class="nav-item">
                            <a href="/studentlogin" className="nav-link text-info fw-bold">Login</a>
                        </li>
                        <li class="nav-item">
                            <a href="/studentregister" className="nav-link text-info fw-bold">Register</a>
                        </li>
                        <li class="nav-item">
                            <a href="#Logout" className="nav-link text-info fw-bold">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        );
    }
}
 
export default Navbar;