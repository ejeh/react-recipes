import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom';
import Signout from './Auth/Signout';

const Navbar = ({ session }) => {
  return (

      <nav>

       { session  && session.getCurrentUser ? <NavbarAuth session = {session}/> : <NavbarUnAuth /> }

      </nav>

  )
};

const NavbarAuth = ({session}) => (

 <Fragment>

  <ul>

    <li>

      <NavLink to='/'  className = "is-active" exact>Home</NavLink>

    </li>

    <li>

      <NavLink to='/search' className = "is-active">Search</NavLink>

    </li>

    <li>

      <NavLink to='/recipe/add' className = "is-active">Add Recipe</NavLink>

    </li>

    <li>

      <NavLink to='/profile' className = "is-active">Profile</NavLink>

    </li>

    <li>

      <Signout />

    </li>


  </ul>

  <h4>Welcome, <strong>{session.getCurrentUser.username}</strong></h4>
  
</Fragment>
)


const NavbarUnAuth = () => (

  <ul>
    <li>

      <NavLink to='/'  className = "is-active" exact>Home</NavLink>

    </li>

    <li>

      <NavLink to='/search' className = "is-active">Search</NavLink>

    </li>

    <li>

      <NavLink to='/signin' className = "is-active">Signin</NavLink>

    </li>

    <li>

      <NavLink to='/signup' className = "is-active">Signup</NavLink>

    </li>


  </ul>

)

export default Navbar;