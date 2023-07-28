import React from 'react'
import { useState } from 'react';
import SearchUser from './SearchUser';

export default function SearchMob() {
    const [searchprofile, setsearchprofile] = useState("");
    const [showsearch, setshowsearch] = useState(false);
    const [userprofiles, setuserprofiles] = useState([]);

    const searchuser = () => {
    console.log("seraching profile" + searchprofile);
    fetch(`http://localhost:8000/searchprofile/${searchprofile}`, {
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
    return (
        <div className='searchbarmob'>

      
        <div className="flex items-center">
            <div className="flex space-x-1">
                <input 
                id='searchinpmob'
                value={searchprofile}
                 onChange={(e) => {
                setsearchprofile(e.target.value);
              searchuser();
                }}
                    type="text"
                    className="w-screen px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search..."
                />
                {/* <button className="px-4 text-white bg-purple-600 rounded-full ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg> */}
                {/* </button> */}
            </div>
        </div>
        {showsearch && (
            <>
              {searchprofile && (
                <SearchUser names={userprofiles} show={setshowsearch} />
              )}
            </>
          )}
        </div>
    );
}
  
