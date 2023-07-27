import React from "react";
import "./SignUp.css";
import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function () {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [confpass, setconfpass] = useState("");

  const toastError =(err)=>
  {
    toast.error(err)

  }
  const toastSuccess = (msg)=>
  {
    toast.success(msg)
  }

    // validate the email
    function ValidateEmail(email)
    {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(mailformat.test(email))
    {
    // alert("Valid email address!");
    return true;
    }
    alert("invalid email address")
  
    return false;
    }
    
    //check password and confirm password
    const validateconfmpass= ()=>
    {
      if(password !== confpass)
    {
      alert("password and confirm password doesn't match")
      return false;

    }
    return true;
  }

    // validate password
    function CheckPassword(password) 
    { 
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(passw.test(password)) 
    { 
    // alert('Correct, try another...')
    return true;
    }
    else
    { 
    alert('Password should contain atleast 6 digits with upper, lower case and number!')
    return false;
    }
    }
    

const signupnow = ()=>
{
  console.log("sign up called")
  if(!ValidateEmail(email))
  {
    return ;
  }
  else if(!CheckPassword(password))
  {
    return ;
  }
  else if(!validateconfmpass())
  {
    return;
  }


  fetch("http://localhost:8000/signup",
  {
    method :"post",
    headers:{ "Content-Type":"application/json"},
    body: JSON.stringify({
      name:name,
      email:email,
      userName:username,
      password:password
    })

  }).then(res=>res.json())
    .then(data =>{
      if(data.error)
      {
        toastError(data.error);
      }
      else{
        toastSuccess(data.message);
       
        navigate("/signin")
      }

    console.log(data)})

}
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      {/* <img
        className="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      /> */}
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
         Create Your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div className="space-y-1 " >
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
          <label htmlFor="email" className="block flex items-center  text-sm font-medium leading-6 text-gray-900">
            Name
          </label>
          <div className="mt-2">
            <input
              onChange={(e)=>{setname(e.target.value)}}
              // id="email"
              // name="email"
              // type="email"
            //   autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block flex items-center  text-sm font-medium leading-6 text-gray-900">
            Username
          </label>
          <div className="mt-2">
            <input
              onChange={(e)=>{setusername(e.target.value)}}
              // id="email"
              // name="email"
              // type="email"
            //   autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center ">
            <label  className="block text-sm font-medium leading-6 text-gray-900">
              Set Password
            </label>
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
          <div className="flex items-center ">
            <label  className="block text-sm font-medium leading-6 text-gray-900">
              Confirm Password
            </label>
          </div>
          <div className="mt-2">
            <input
              onChange={(e)=>{setconfpass(e.target.value)}}
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
            onClick={()=>signupnow()}
            // type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign Up
          </button>
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-gray-500">
        {/* Create new account?{' '} */}
        {/* <Link to="/signup">
        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Sign Up now
        </a>
      </Link> */}
       
      </p>
    </div>
  </div>
  );
}
