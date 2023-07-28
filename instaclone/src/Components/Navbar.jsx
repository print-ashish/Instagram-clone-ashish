import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Images/instalogo.jpg";
import "./Navbar.css";
import { Link } from "react-router-dom";
import SearchUser from "./SearchUser";
import LogOutModal from "./LogOutModal";
// Initialization for ES Users

const Navbar = () => {
  

  const [searchprofile, setsearchprofile] = useState("");
  const [showlogout, setshowlogout] = useState(false)
  const navigate = useNavigate();
  const [userprofiles, setuserprofiles] = useState([]);
  const [showsearch, setshowsearch] = useState(false);
  const searchuser = () => {
    console.log("seraching profile" + searchprofile);
    fetch(`/searchprofile/${searchprofile}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // setsearchprofile("");
        setuserprofiles(data);
        setshowsearch(true);
        // setsearchprofile("");
      })
      .catch((err) => console.log(err));
  };
 
  const mobloadlinks = () => {
    const loggedIn = localStorage.getItem("jwt");
    if (loggedIn) {
      // console.log("user logged in");
      return (
        <>
        <Link to="/search">
          <span
          id="searchbtnmob"
            class="material-symbols-outlined searchbtn "
          >
            search
          </span>
          </Link>
          <Link to="/home">
            <span class="material-symbols-outlined">home</span>
          </Link>
          <Link to="/profile">
            <span class="material-symbols-outlined">person</span>
          </Link>
          <Link to="/createpost">
            <span class="material-symbols-outlined">post_add</span>
          </Link>
          <span  onClick={()=> {setshowlogout(true);console.log("logging out btn clicked")}}class="material-symbols-outlined">
logout
</span>
          {/* <button
            type="button"
            class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-toggle="modal"
            data-te-target="#exampleModal"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={()=> {setshowlogout(true);console.log("logging out btn clicked")}}
          >
            LogOut
          </button> */}
          {/* {showlogout && <LogOutModal show={setshowlogout}></LogOutModal>} */}

        </>
      );
    } else {
      console.log("not logged in");
      return (
        <>
          <Link to="signin">
            <li id="signin">SignIn</li>
          </Link>
          <Link to="signup">
            <li id="signup">SignUp</li>
          </Link>
        </>
      );
    }
  };
  
  var loadlinks = () => {
    const loggedIn = localStorage.getItem("jwt");
    if (loggedIn) {
      // console.log("user logged in");
      return (
        <>
          <span>
            <input
              id="searchbar"
              placeholder="search name"
              type="text"
              value={searchprofile}
              onChange={(e) => {
                setsearchprofile(e.target.value);
                searchuser();
              }}
            />
          </span>
          {/* <span onClick={()=>{searchuser()}} class="material-symbols-outlined searchbtn">
search
</span> */}
          <Link to="/home">
            <span class="material-symbols-outlined">home</span>
          </Link>
          <Link to="/profile">
            <span class="material-symbols-outlined">person</span>
          </Link>
          <Link to="/createpost">
            <span class="material-symbols-outlined">post_add</span>
          </Link>
        {/* log out modal */}
        {/* <LogOutModal state={showlogout}></LogOutModal> */}
          <button
            type="button"
            class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-toggle="modal"
            data-te-target="#exampleModal"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={()=> {setshowlogout(true);console.log("logging out btn clicked")}}
          >
            LogOut
          </button>
        </>
      );
    } else {
      console.log("not logged in");
      return (
        <>
          <Link to="signin">
            <li>SignIn</li>
          </Link>
          <Link to="signup">
            <li>SignUp</li>
          </Link>
        </>
      );
    }
  };
  useEffect(() => {
    loadlinks();
    mobloadlinks();
    console.log("loading links")
  }, [showlogout]);

  return (
    <>
      {/* mobile nabvbar */}
      <div className="mobnav">{mobloadlinks()}</div>

      <div className="navbar">
        <img src={logo} />
        <ul className="nav-menu">
          {loadlinks()}
          {showlogout && <LogOutModal show={setshowlogout}></LogOutModal>}
          {/* <!-- Button trigger modal --> */}
          {/* <!-- Button trigger modal --> */}

          {showsearch && (
            <>
              {searchprofile && (
                <SearchUser names={userprofiles} show={setshowsearch} />
              )}
            </>
          )}
        </ul>
      </div>
    </>
  );
};
export default Navbar;
