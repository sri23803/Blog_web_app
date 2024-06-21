import React, { useContext, useState } from "react";
import Headnavbar from "./Headnavbar";
import axios from "axios";
import {userContext} from './App'
import { MdPostAdd } from "react-icons/md";
import Navbar from "./Navbar";

const Createpost = () => {
  const [title, setTitle] = useState();
  const[desc, setDesc] = useState();
  const [file, setFile] = useState();
  const user = useContext(userContext)

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('title', title)
    formData.append('desc', desc)
    formData.append('email', user.email)
    formData.append('file', file)
     
    axios
      .post("http://localhost:3001/create", formData)
      .then((res) => {
        if(res) {
          window.location.href = "/home"
        } else {
          console.log("error")
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Headnavbar />
      <div className="createpost-container">
        <div className="post-form">
          <form onSubmit={handleSubmit}>
            <h3>Create Post</h3>
            <input
              type="text"
              placeholder="Enter Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              name="desc"
              id="desc"
              cols="30"
              rows="10"
              placeholder="Enter Description"
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <input
              type="file"
              className="file"
              placeholder="Select file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button className="btn btn-none btn-1 w-25 me-5"><MdPostAdd className="me-2"/>Post</button>
          </form>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Createpost;
