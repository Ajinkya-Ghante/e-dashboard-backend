const mongoose=require('mongoose')
// mongoose.connect('mongodb://localhost:27017/e-commers')

const userSchema = new mongoose.Schema({
    name: String,
    email:String,
    password:String
})

// const connectDB= async ()=>{
//     mongoose.connect('mongodb://localhost:27017/shopping-cart')
//     const productSchema= new mongoose.Schema({})
//     const product=mongoose.model('products',productSchema)
//     const data=await product.find()
//     console.log(data)
// }
// 
// connectDB()

module.exports= mongoose.model('users',userSchema)