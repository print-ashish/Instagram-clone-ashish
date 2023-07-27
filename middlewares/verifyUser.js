const jwt = require("jsonwebtoken");
const jwtsecretkey = require("../routes/keys")
const mongoose = require("mongoose");
const USER = mongoose.model("USER");



module.exports = (req,res,next)=>
{
    // console.log("authorizing user")
    const {authorization} = req.headers;
    // if(!authorization)
    {
        // return res.json({error:"sorry you need to login first"})
        

        
    // }
    // else{
        const token = authorization;
    //    res.json({success:"authorised"})
       jwt.verify(token,jwtsecretkey,(err,payload)=>
       {
        if(err)
        {
            return res.json({error:"Please Login In First"})
            
        }
        else if(payload){
            // res.json({success:payload.id})
            //search user with that id
            USER.findById(payload.id).then((userdata)=>
            {
                if(!userdata)
                {
                   return  res.json({error:"User NOt found"})

                }
                else{
                    req.user = userdata;
                    // res.json(userdata);
                    next();
                }
            })
        }
       })

    }
   

    
}