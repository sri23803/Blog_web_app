import axios from "axios";
import Headnavbar from "./Headnavbar";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RiEditLine } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { userContext } from "./App";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useContext(userContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getpostbyid/${id}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/deletepost/${id}`)
      .then((res) => {
        if (res.data === "Success") {
          window.location.href = "/home";
        } else {
          console.log("error");
        }
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return <div className="text-center text-secondary">Loading...</div>;
  }
  if (!post) {
    return <div className="text-center text-secondary">Post not found</div>;
  }

  return (
    <div>
      <Headnavbar />
      <div className="postpage-div">
        <div className="postpage-innerdiv">
          <h2>{post.title}</h2>
          <img
            src={`http://localhost:3001/Images/${post.file}`}
            alt="Post Image"
          />
          <p>{post.desc}</p>
          <div>
            {user.email === post.email ? (
              <>
                <Link
                  className="btn btn-none me-2 btn-1 w-25"
                  to={`/editpost/${post._id}`}
                ><RiEditLine className="me-2"/>
                  Edit
                </Link>
                <button
                  className="btn btn-none btn-2 w-25"
                  onClick={(e) => handleDelete(post._id)}
                ><FaRegTrashAlt className="me-2"/>
                  Delete
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
