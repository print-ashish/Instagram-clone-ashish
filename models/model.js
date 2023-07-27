const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
    {
         name :
         {
            type: String,
            required: true
         } ,
         userName:{
            type:String,
            required: true
         },
         bio:{
            type:String,
            
            
         },
         email:
         {
            type:String,
            required: true
         },
         password:
         {
            type:String,
            required: true
         },
         followers: [
         {
            type:ObjectId,
            
            
            
         }],
         following: [
            {
               type:ObjectId
               
            }]

    }

)

mongoose.model("USER", userSchema)