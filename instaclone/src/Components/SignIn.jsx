import React, { useEffect, useState } from "react";
import "./SignIn.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, redirect, useNavigate } from "react-router-dom";

const SignIn = ()=>
{
    const navigate = useNavigate();
    const[email, setemail] = useState("");
    const[password, setpassword] = useState("");
    
    const signinnow = ()=>
    {
        fetch("/signin",
        {
          method :"post",
          headers:{ "Content-Type":"application/json"},
          body: JSON.stringify({
   
           email:email,
           password:password
          })
      
        }).then(res => res.json()).then(data => {
        
            if(data)
            {
                // console.log(data.message);
                toastSuccess(data.message);
                localStorage.setItem("jwt", data.token_val);
                localStorage.setItem("userdata", JSON.stringify(data.user));
                // localStorage.setItem("jwt", data.token_val);
                console.log(data.user.name);
                console.log(data.user._id);
                navigate("/profile");
            }
            else{
                // console.log(data.error);
                toastError(data.error)
            }

        });

    }
 

    const toastError =(err)=>
    {
      toast.error(err)
  
    }
    const toastSuccess = (msg)=>
    {
      toast.success(msg);
      navigate("/home")
    }

    // useEffect(()=>
    // {
    //     fetchdata()

    // },[])


    return(<>
        <div className="SignInBox">
            <h1>Sign In</h1>
            <div className="login-box">
                <input type="text" placeholder="Enter your email" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                <input type="text" placeholder="Enter your password" value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
                <button type="submit" onClick={signinnow}>Sign In</button>
            </div>
            <a href="#">forgot password</a>



        </div>
    </>)
}
export default SignIn;