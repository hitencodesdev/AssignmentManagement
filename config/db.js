const mongoose=require('mongoose')

const connectDB=async()=>
{
    try {
        await mongoose.connect("mongodb://localhost:27017/Assignment")
        console.log("database connected...")
    } catch (error) {
        console.log("database crashed...")
    }
}

module.exports=connectDB

