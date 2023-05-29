const express = require('express')
const mongoose=require('mongoose')
const multer = require('multer')
// 

require('./db/config')
const User = require('./db/users')
const Product = require('./db/Product')

const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cors())

 
 app.post("/register",async(req,res)=>{
    // res.send('api in calling...')
    //console.log(req.body)
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    console.log(result)
    res.send(result)
 })

app.post("/login",async(req,res)=>{
    console.log(req.body)
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select('-password')
        if(user){
            res.send(user)
        } else {
            res.send({ result : "No User Found"})
        }
    } else {
        res.send({ result : "No User Found"})
    }
    
}) 

app.post("/add-product", async (req, resp) => {
    //console.log(req.body)
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

app.get("/products", async (req, resp) => {   
    let page = Number(req.query.page) || 1;
    let limit = req.query.limit || 5;
    let skip = (page-1) * limit;
    let count = await Product.countDocuments()
    totalPages = Math.ceil(count/limit)
     const products = await Product.find({}).skip(skip).limit(limit);
     
    if (products.length > 0) {
        resp.send({products , nbPages : totalPages})
    } else {
        resp.send({ result: "No Product found" })
    }
});


app.delete("/product/:id", async (req, resp) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result)
}),

app.get("/product/:id", async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result)
    } else {
        resp.send({ "result": "No Record Found." })
    }
})

app.put("/product/:id", async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
});

app.get("/search/:key", async (req, resp) => {
    
    let result = await Product.find({
        "$or": [
            {
                name: { $regex: req.params.key }  
            },
            {
                company: { $regex: req.params.key }
            },
            {
                category: { $regex: req.params.key }
            }
        ]
    });
    resp.send(result);
})
-+


// const connectDB= async ()=>{
//     mongoose.connect('mongodb://localhost:27017/shopping-cart')
//     const productSchema= new mongoose.Schema({})
//     const product=mongoose.model('products',productSchema)
//     const data=await product.find()
//     console.log(data)
// }
// 
// connectDB()
// app.get("/",(req,res)=>{
//     res.send("Hello...")
// })


app.listen(5000, (res,req)=>{
    console.log(res)
})




// app.get("/products", async (req, resp) => {   
//     let page = Number(req.query.page) || 1;
//     let limit = req.query.limit || 3;
//     let skip = (page-1) * limit;
//     const products = await Product.find({}).skip(skip).limit(limit);
//      
//     if (products.length > 0) {
//         resp.send({products , nbHits : products.length})
//     } else {
//         resp.send({ result: "No Product found" })
//     }
// });