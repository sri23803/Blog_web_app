const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/UserModel");
const PostModel = require('./models/postModel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const nodemailer = require('nodemailer');
const path = require("path");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.static('public'))

mongoose.connect("mongodb://127.0.0.1:27017/blog"); //mongodb://localhost:27017/

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("The token is missing")
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json("The token is wrong")
      } else {
        req.email = decoded.email;
        req.username = decoded.username;
        next()
      }
    })
  }
}

app.get('/', verifyUser, (req, res) => {
  return res.json({ email: req.email, username: req.username })
})

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, responce) => {
          if (responce) {
            const token = jwt.sign({ email: user.email, username: user.username }, "jwt-secret-key", { expiresIn: '1d' })
            res.cookie('token', token)
            return res.json("success")
          } else {
            return res.json("password in correct");
          }
        })
      } else {
        res.json("No record found")
      }
    })
})

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      UserModel.create({ username, email, password: hash })
        .then(user => res.json(user))
        .catch(err => res.json(err))
    })
    .catch((err) => res.json(err))
})

app.get("/logout", (req, res) => {
  res.clearCookie('token')
  return res.json("success")
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Public/Images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})

app.post('/create', verifyUser, upload.single('file'), (req, res) => {
  PostModel.create({ 
     title: req.body.title,
     desc: req.body.desc, 
     email:req.body.email,
     file: req.file.filename })
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.get('/getpost', (req, res) => {
  PostModel.find()
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
})

app.get('/getpostbyid/:id', (req, res) => {
  const id = req.params.id
  PostModel.findById({ _id: id })
    .then(post => res.json(post))
    .catch(err => console.log(err))
})

app.put('/updatepost/:id', (req, res) => {
  const id = req.params.id;
  PostModel.findByIdAndUpdate({ _id: id }, { title: req.body.title, desc: req.body.desc }) /*for updation we must give seprate field for id and title*/
    .then(post => res.json("Success"))
    .catch(err => console.log(err))
})

app.delete('/deletepost/:id', (req, res) => {
  const id = req.params.id;
  PostModel.findByIdAndDelete({_id:id})
  .then(result => res.json("Success"))
  .catch(err => console.log(err))
})

app.get('/getpostbyemail/:email', (req, res) => {
  const email = req.params.email
  PostModel.find({ email: email })
    .then(post => res.json(post))
    .catch(err => console.log(err))
})

app.listen(3001, () => {
  console.log("server is running");
});
