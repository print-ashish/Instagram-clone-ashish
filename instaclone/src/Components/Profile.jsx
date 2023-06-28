import React, { useState , useEffect} from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate()

  const [mypost ,setmyposts] = useState([])
  useEffect(() => {
    fetch("/profile", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.error)
        {
          // 
          console.log("frontend : ",data.error);
          navigate("/signin")
        }
        else{
          setmyposts(data);
        console.log(data);

        }
      
      });
  }, []);
  return (
    <>

    

    <div className="profile-container">
      {/* profileHeader */}
      <div className="profile-header">
        {/* profile-pic */}
        <div className="profile-pic">
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
            alt=""
          />
        </div>
        {/* profile-details */}
        <div className="profile-details">
          {/* 1 */}
          <div className="firstsection">
            <h2>{JSON.parse(localStorage.getItem("userdata")).userName}</h2>
            <button>Edit profile</button>
            <span class="material-symbols-outlined">settings</span>
          </div>
          {/* 2 */}
          <div className="secondsection">
            <div className="posts">
              <h3>{mypost.length}</h3>
              <p>Posts</p>
            </div>
            <div className="followers">
              <h3>144</h3>
              <p>Followers</p>
            </div>
            <div className="following">
            <h3>77</h3>
            <p>Following</p>
            </div>
        
          </div>
          <div className="thirdsection">
                <h4>{JSON.parse(localStorage.getItem("userdata")).name}</h4>
                <p>Jai Shree Ram</p>

          </div>
        </div> 
      </div>
    </div>
    <div className="gallery">
    {mypost.slice(0).reverse().map((post)=>
    {
      return(
        <>
          <img src={post.picture} alt="" />
        </>
      )
    })}

    </div>
    </>
  );
}
