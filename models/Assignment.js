const mongoose=require('mongoose')

const assignmentSchema=new mongoose.Schema({
    id:{
        type:String,
        unique:true
    },
    studentId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    fileName:{
        type:[String],
        required:true
    },
    submittedTo:
    {
        type:String,
    }
},{timestamps:true})

const assignment=mongoose.model("Assignment",assignmentSchema)
module.exports=assignment