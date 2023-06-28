const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;
const postSchema = new mongoose.Schema(
    {
         caption :
         {
            type: String,
            
         } ,
         picture:
         {
            type : String,
            required: true
         },
         likes: [
         {
            type:ObjectId,
            ref:"USER",
            
         }],
         comments:[
            {comment:{type:String},
            commentedBy:{type:ObjectId, ref :"USER"}            
          }],
         postedBy:
         {
            type: ObjectId,
            ref:"USER"
         }
    
    }

)

mongoose.model("POST", postSchema)