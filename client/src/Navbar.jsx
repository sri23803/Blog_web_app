import React, { useContext } from 'react'
import { GoHome } from "react-icons/go";
import { MdAddCircleOutline } from "react-icons/md";
import { IoIosContact } from "react-icons/io";
import { userContext } from "./App";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = useContext(userContext);

  return (
    <nav>
        <Link to="/home"><GoHome /></Link>
        <Link to="/createpost"><MdAddCircleOutline /></Link>
        <Link to={`/userpost/${user.email}`}><IoIosContact /></Link>
    </nav>
  )
}

export default Navbar