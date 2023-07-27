import React, { useEffect, useState } from "react";
// import "./SignIn.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, redirect, useNavigate } from "react-router-dom";
import SignInTailwind from "./SignInTailwind";

const SignIn = ()=>
{
    const navigate = useNavigate();
    const[email, setemail] = useState("");
    const[password, setpassword] = useState("");
    
    const signinnow = ()=>
    {
        fetch("http://localhost:8000/signin",
        {
          method :"post",
          headers:{ "Content-Type":"application/json"},
          body: JSON.stringify({
   
           email:email,
           password:password
          })
      
        }).then(res => res.json()).then(data => {
        
            if(data.message)
            {
                // console.log(data.message);
                toastSuccess(data.message);
                localStorage.setItem("jwt", data.token_val);
                localStorage.setItem("userdata", JSON.stringify(data.user));
                // localStorage.setItem("jwt", data.token_val);
                // console.log(data.user.name);
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
        {/* <SignInTailwind></SignInTailwind> */}
        {/* <div className="SignInBox">
            <h1>Sign In</h1>
            <div className="login-box">
                <input type="text" placeholder="Enter your email" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                <input type="text" placeholder="Enter your password" value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
                <button type="submit" onClick={signinnow}>Sign In</button>
            </div>
            <a href="#">forgot password</a>



        </div> */}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6 " >
            <div>
              <label htmlFor="email" className="block flex items-center  text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={(e)=>{setemail(e.target.value)}}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center ">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  onChange={(e)=>{setpassword(e.target.value)}}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={()=>signinnow()}
                // type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </div>`  `

          <p className="mt-10 text-center text-sm text-gray-500">
            Create new account?{' '}
            <Link to="/signup">
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign Up now
            </a>
          </Link>
           
          </p>
        </div>
      </div>
    </>)
}
export default SignIn;