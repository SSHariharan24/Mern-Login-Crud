const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./models/Register')

const app = express()
app.use(cors());
app.use(express.json())

mongoose.connect('mongodb://localhost/crud');


app.get("/", (req, res) => {
    res.json("Hello");
})

app.post('/login',(req,res)=>{
    const{email,password} = req.body;
    RegisterModel.findOne({email:email})
    .then(user =>{
        if(user){
            if(user.password === password){
                res.json('success')
            }else{
                res.json('The password is incorrect')
            }
        }else{
            res.json('No record existed')
        }
    })
})


app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    RegisterModel.findOne({email: email})
    .then(user => {
        if(user) {
            res.json("Already have an account")
        } else {
            RegisterModel.create({name: name, email: email, password: password})
            .then(result => res.json(result))
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("Server is Running")
})