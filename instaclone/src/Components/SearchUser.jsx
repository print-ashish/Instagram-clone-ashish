import React from "react";
import "./SearchUser.css";

import { Link } from "react-router-dom";
function SearchUser(props) {
  return (
    <>
      <div className="searchbox">
        <span
          onClick={() => props.show(false)}
          class="material-symbols-outlined closebtn"
        >
          close
        </span>
        <ul className="searchul">
          {props.names.map((elem) => {
            return (

              <Link to={`/userprofile/${elem._id}`}>
                <li className="searchli" onClick={() => props.show(false)}><span><img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
            alt=""
          /></span>{elem.name}</li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default SearchUser;
