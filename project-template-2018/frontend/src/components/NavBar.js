import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../styles/components/App.css';

class NavBar extends React.Component {
   render() {
       return (

     <div className='container'>
      <header>
         <nav>
           <ul>
             <li><Link to='/'>Home</Link></li>
             <li><Link to='/registrationUser'>Registration</Link></li>
             <li><Link to='/login'>LogIn</Link></li>
           </ul>
         </nav>
       </header>
     </div>
    );
  }
}



export default NavBar;
