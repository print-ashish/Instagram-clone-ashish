import React, { useEffect } from "react";
import logo from "../Images/instalogo.jpg";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {

    useEffect(() => {
     loadlinks();
    }, [])
    
  
const loadlinks = () => {
    const loggedIn = localStorage.getItem("jwt");
    if (loggedIn) {
      console.log("user logged in");
      return (
        <>
         <Link to="home">
         <span class="material-symbols-outlined">
home
</span>
          </Link>
         <Link to="profile">
         <span class="material-symbols-outlined">
person
</span>
          </Link>
          <Link to="createpost">
            <span class="material-symbols-outlined">post_add</span>
          </Link>

        </>
      );
    } else {
      console.log("not logged in");
      return(<>
           <Link to="signin">
            <li>SignIn</li>
          </Link>
          <Link to="signup">
            <li>SignUp</li>
          </Link>
      </>)
    }
  };

   return (
    <>
      <div className="navbar">
        <img src={logo} />
        <ul className="nav-menu">
          {loadlinks()}
       
         
        </ul>
      </div>
    </>
  );
};
export default Navbar;
