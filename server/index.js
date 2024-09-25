const express =  require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userModel = require('./models/Users')        // this is crud schema 
const RegisterModel = require('./models/Register') // this is signin and signup schema 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const app = express()
app.use(cors())
//     {
//     origin:["http://localhost:5173"],
//     methods:["GET","POST"],
//     credentials:true 
// }

app.use(express.json())
app.use(cookieParser())
const PORT = 4000

mongoose.connect("mongodb://localhost/crud")

// this api is used for crud operation
app.get('/',(req,res)=>{
    userModel.find({})
    .then(users => res.json(users))
    .catch(err => console.log(err))
})

app.get('/logout',(req,res)=>{
    return res.json({status:true})
})

app.get("/getUser/:id",(req,res)=>{
    const id = req.params.id
    userModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => console.log(err))
})

app.put("/updateUser/:id",(req,res)=>{
    const id = req.params.id
    userModel.findByIdAndUpdate({_id:id},{
        name:req.body.name,
        email:req.body.email,
        age:req.body.age})
    .then(users => res.json(users))
    .catch(err => console.log(err))
})

app.post("/createUser",(req,res)=>{
    userModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.delete("/deleteUser/:id",(req,res)=>{
    const id = req.params.id
    userModel.findByIdAndDelete({_id:id})
    .then(users => res.json(users))
    .catch(err => console.log(err))
})


//this api is used for signin and signup
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



//this code is used for authentication login and signin
// app.post('/login',(req,res)=>{
//     const{email,password} = req.body;
//     RegisterModel.findOne({email:email})
//     .then(user =>{
//         if(user){
//             bcrypt.compare(password,user.password,(err,response)=>{
//                 if(response){
//                     const token = jwt.sign({email:user.email},"jwt-secret-key",{expiresIn:"1d"})
//                     res.cookie('token',token)
//                     return res.json({Status:"Success"})
//                 }else{
//                     res.json('The password is incorrect')
//                 }
//             })
            
//         }else{
//             res.json('No record existed')
//         }
//     })
// })

// app.post('/register', (req, res) => {
//     const {name, email, password} = req.body;
//     bcrypt.hash(password,10)
//     .then(hash => {
//        RegisterModel.create({name, email, password: hash})
//             .then(result => res.json("Success"))
//             .catch(err => res.json(err))
        
//     }).catch(err => res.json(err))
// })




app.listen(PORT, ()=>{
    console.log(`server is running ${PORT}` );
    
})