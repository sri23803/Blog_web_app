import React, { useContext, useEffect, useState } from 'react'
import Headnavbar from './Headnavbar'
import Navbar from './Navbar'
import { userContext } from "./App";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Userpost = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(email === "undefined") {
      navigate('/login')
    }
    axios
      .get(`http://localhost:3001/getpostbyemail/${email}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [email]);

  if (loading) {
    return <div className="text-center text-secondary">Loading...</div>;
  }
  if (!post) {
    return <div className="text-center text-secondary">Post not found</div>;
  }

  return (
    <div className="home">
      <Headnavbar />
      <div className="home-container">
        {post.map((posts, index) => (
          <div key={index} className="home-link">
            <div className="posts">
              <h2>{posts.title}</h2>
              <div className="posts-image">
                <img
                  className="home-post-img"
                  src={`http://localhost:3001/Images/${posts.file}`}
                  alt="Blog Image"
                />
              </div>
              <p>{posts.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <Navbar />
    </div>
  )
}

export default Userpost