import React from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Headnavbar = () => {
  const Navigate = useNavigate()
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get("http://localhost:3001/logout")
    .then(res => {
      if(res.data === "success") {
        window.location.href = "/login"
        //Navigate("/login")
      } else {
        console.log("error in nav")
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='navbar-header'>
      <div>
      <a className='link' href="/home"><h3>BLOG APP</h3></a>
      </div>
      <div>
        <input type="button" onClick={handleLogout} value="Logout" className='link'/>
      </div>
        
    </div>
  )
}

export default Headnavbar