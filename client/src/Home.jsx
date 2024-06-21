import React, { useEffect, useState } from "react";
import Headnavbar from "./Headnavbar";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getpost")
      .then((posts) => {
        setPosts(posts.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home">
      <Headnavbar />
      <div className="home-container">
        {posts.map((posts, index) => (
          <Link to={`/post/${posts._id}`} key={index} className="home-link">
            <div className="posts">
              <h2>{posts.title}</h2>
              <div className="posts-image">
                <img
                  className="home-post-img"
                  src={`http://localhost:3001/Images/${posts.file}`}
                  alt="Blog Image"
                />
              </div>
              <p className="text-center text-secondary">
                Created By: {posts.email}
              </p>
              <p>{posts.desc}</p>
            </div>
          </Link>
        ))}
      </div>
      <Navbar />
    </div>
  );
};

export default Home;
