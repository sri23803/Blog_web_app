import React, { useEffect, useState } from "react";
import Headnavbar from "./Headnavbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MdPostAdd } from "react-icons/md";

const Editpost = () => {
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/updatepost/${id}` , { title, desc })
      .then((res) => {
        if (res.data === "Success") {
          navigate("/home")
        } else {
          console.log("error");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getpostbyid/${id}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
        setTitle(res.data.title);
        setDesc(res.data.desc);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center text-secondary">Loading...</div>;
  }

  if (!post) {
    return <div className="text-center text-secondary">Post not found</div>;
  }

  return (
    <div>
      <Headnavbar />
      <div className="createpost-container">
        <div className="post-form">
          <form onSubmit={handleSubmit}>
            <h3>Update Post</h3>
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              name="desc"
              id="desc"
              cols="30"
              rows="10"
              placeholder="Enter Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <input
              type="file"
              className="file"
              placeholder="Select file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button className="btn btn-none btn-1 w-25 me-5"><MdPostAdd className="me-2"/>Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editpost;
