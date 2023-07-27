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
    <div className="signup_container">
      <h1>Sign Up</h1>
      <div class="signup_inp">
        <input
          type="text"
          placeholder="enter your name"
          value={name}
          onChange={(event) => {
            setname(event.target.value);
          }}
        />
        <input
          type="text"
          autoComplete="on"
          placeholder="enter your email"
          value={email}
          onChange={(event) => {
            setemail(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="enter your userName"
          value={username}
          onChange={(event) => {
            setusername(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="enter your password"
          value={password}
          onChange={(event) => {
            setpassword(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="confirm your password"
          value={confpass}
          onChange={(event) => {
            setconfpass(event.target.value);
          }}
        />
        <div className="useraccept">
          <input type="checkbox" id="vehicle1" name="vehicle1" />
          <label for="vehicle1"> Accept Terms and Conditions policy</label>
        </div>

        <button onClick={signupnow}>SignUp</button>
      </div>
      <p>
        already have an account{" "}
        <span>
          <Link to={"/signin"}>Sign in</Link>
        </span>
      </p>
    </div>
  );
}
