const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const jwt = require("jsonwebtoken");
const verifyUser = require("../middlewares/verifyUser");
const jwtsecretkey = require("./keys")
const POST = mongoose.model("POST");



router.get("/home",verifyUser,(req, res)=>
{
    // console.log("home called ");
    POST.find().populate("postedBy").populate("comments.commentedBy", "_id name")
    .then((data)=>res.json(data)).catch(err=>console.log(err));

})

router.post("/test",(req, res)=>
{
    res.json({message:"hello from post test"})
    // console.log("home called ");

})

router.get("/test",(req, res)=>
{
    res.json({message:"hello from get test"})
    // console.log("home called ");

})


router.get("/profile",verifyUser,(req, res)=>
{
    // console.log("user = ",req.user._id)
    POST.find({"postedBy":req.user}).populate("postedBy")
    .then((data)=>{
        if(data)
        {
            res.json(data)

        }
        else{
            res.json({error:"not found"})
        }
       
        // console.log(data);
    }).catch(err=>console.log(err));

})

router.get("/createpost",verifyUser,(req,res)=>
{
    // console.log("hello from the server createpost");
    // res.send("welcome to createpost by backend")
})

router.post("/createpost",verifyUser,(req,res)=>
{
    const {caption,picture} = req.body;
    if(!picture || !caption )
    {
        console.log("empty body")
        res.json({error:"Please fill all the fields"})
    }
    else{
        // console.log("saving post.......")
        const post = new POST(
            {
                caption,
                picture,
                postedBy: req.user
            }
        )
        post.save().then((result)=>
        {
            if(result)
            {
                res.json({
                    result: result,
                    message:"Posted successfully"

                });
            }
            else{
                res.json({error:"error saving post"})
            }
           
        })

    }
    
    // res.send("welcome to createpost by backend")
})
router.post("/signin",(req,res)=>
{
    const{email, password} = req.body;
    // console.log(email + password);
    // console.log("post request to sign in method");
    // res.json({message:"hello from sign in post backend"})
    USER.findOne({email:email}).then((resdatauser)=>
    {
        if(resdatauser)
        {
        //   console.log("user found");
        //   res.json({message:"user data available"})
        // console.log("password is" + resdatauser.password)
         if(password === resdatauser.password)
         {
            const token = jwt.sign({id: resdatauser.id},jwtsecretkey)
            // console.log(token);
            res.json({message:"password matched",token_val:token,"user":resdatauser})
         }
         else{
            res.json({error:"password not matched"})
         }

        }
        else{
            res.json({error:"user not found"})
        }
        // else{res.json({message:"user doesnt exist"})}

    });
})

router.post("/signup",(req,res)=>
{
    // console.log("backend sign up")
    const{name, userName,email , password} = req.body;
    if(!name || !userName || !email || !password )
    {
        res.json({error:"Please Fill all the fields"})
    }
    USER.findOne({email:email}).then((resdatauser)=>
    {

        if(resdatauser)
        {
            // console.log("user already exist");
            // console.log(resdatauser);
            res.json({error:"user already exits in the db"})
        }
        else{
            const user = new USER(
                {
                    name,
                    email,
                    userName,
                    password
                }
            )
            user.save()
            .then(user=>{ res.json({message:"saves success"})}).catch(err =>{error: "error saving data"})
        
        



        }



    })
    
})
router.put("/unlike",verifyUser,(req,res)=>
{
    // console.log("post id = ",req.body.postId  )
    // console.log("user id = ",req.user._id  )
    POST.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id} 
    },
    {
        new:true
    }).populate("postedBy").then((data)=>
    {
        if(data)
        {
            res.json(data)
        }
        else{
            res.json({error: "error disliking"})
        }
    })
    
})
router.put("/like",verifyUser,(req,res)=>
{
    // console.log("post id = ",req.body.postId  )
    // console.log("user id = ",req.user._id  )
    POST.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id} 
    },
    {
        new:true
    }).populate("postedBy").then((data)=>
    {
        if(data)
        {
            console.log('post liked')
            // console.log(data);
            res.json(data)
        }
        else{
            res.json({error: "error liking"})
        }
    }).catch(err=>res.json(err))
    
})


router.put("/comment",verifyUser,(req,res)=>
{
    console.log("commenting")
    const commentobj = {
        comment: req.body.text,
        commentedBy: req.user._id
    }
    POST.findByIdAndUpdate(req.body.postId,{
        $push:{comments: commentobj}
    },{
            new: true
        }
    ).populate("postedBy","name").populate("comments.commentedBy" , "_id name").then((data)=>
    {
        if(data)
        {
            res.json(data);
            // console.log(data);
        }
        else{
            res.json({error:"unable to comment"})
            // console.log("unable to comment")
        }
    })
})
module.exports = router;