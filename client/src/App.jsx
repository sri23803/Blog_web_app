import { createContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Createpost from "./Createpost";
import Userpost from "./Userpost";
import axios from "axios";
import Post from "./Post";
import Editpost from "./Editpost";

export const userContext = createContext()

function App() {
const [user, setUser] = useState({
  username :null,
  email: null
})

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:3001/')
    .then(user => {
      setUser(user.data)
  })
    .catch(err => console.log(err))
  }, [])

  return (
    <div className="app">
      <userContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/createpost" element={<Createpost />}></Route>
          <Route path="/userpost/:email" element={<Userpost />}></Route>
          <Route path="/post/:id" element={<Post />}></Route>
          <Route path="/editpost/:id" element={<Editpost />}></Route>
        </Routes>
      </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
