import React, { useEffect, useState } from 'react'
import { Routes, Route, useParams, useAsyncError } from 'react-router-dom';
import "./UserProfile.css"



export default function UserProfile() {
  const {id} = useParams()
  // console.log("loading user data for = ",id);
  const [userposts, setuserposts] = useState([])
  const [userdata, setuserdata] = useState("")
  const [isfollowed, setisfollowed] = useState(false)
    //fetch user data

  
  const unfollowuser = (userId)=>
  {
    console.log("unfollowing "+ userId);
    fetch("/unfollow",
    {
      method :"put",
      headers:{ "Content-Type":"application/json",
      Authorization: localStorage.getItem("jwt")},
      body: JSON.stringify({
        userId:userId
      })
  
    }).then(res=>res.json()).then((data)=>
      {
        if(data)
        {
          console.log("unfollowed success"+ data)
          setisfollowed(false);
        }
        else{
          console.log("error following")
        }
      })
  }

  const followuser =(userId)=>{
    console.log("following = "+ userId);

    fetch("/follow",
  {
    method :"put",
    headers:{ "Content-Type":"application/json",
    Authorization: localStorage.getItem("jwt")},
    body: JSON.stringify({
      userId:userId
    })

  }).then(res=>res.json()).then((data)=>
    {
      if(data)
      {
        console.log("followed success"+ data);
        setisfollowed(true);
      }
      else{
        console.log("error following")
      }
    })

  }
  useEffect(() => {
    // console.log("fetching data ")
    fetch(`/user/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
    }).then(res=>res.json()).then((result)=>
      {
        setuserposts(result.posts)
        setuserdata(result.data);
        if(result.data.followers.includes(JSON.parse(localStorage.getItem("userdata"))._id))
        {
          setisfollowed(true);
          console.log("already followed")
        }
        // console.log(userposts)

      })
  }, [id, isfollowed]);



  if(userdata === "")
  {
    // console.log("undefined")
    return null
  }
  


  return (
    <>

    {/* {console.log(mypost)} */}

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
            <h2>{userdata.userName}</h2>
            {!isfollowed && <button className='followbtn' onClick={()=>{followuser(userdata._id)}}>follow</button>}
            {isfollowed && <button className='unfollowbtn' onClick={()=>{unfollowuser(userdata._id)}}>unfollow</button>}
            
            <span class="material-symbols-outlined">settings</span>
          </div>
          {/* 2 */}
          <div className="secondsection">
            <div className="posts">
              <h3>{userposts.length}</h3>
              <p>Posts</p>
            </div>
            <div className="followers">
              <h3>{userdata.followers.length}</h3>
              <p>Followers</p>
            </div>
            <div className="following">
            <h3>{userdata.following.length}</h3>
            <p>Following</p>
            </div>
        
          </div>
          <div className="thirdsection">
                <h4>{userdata.name}</h4>
                <p>{JSON.parse(localStorage.getItem("userdata")).bio}</p>

          </div>
        </div> 
      </div>
    </div>
    <div className="gallery">
    {userposts.slice(0).reverse().map((post)=>
    {
      return(
        <>
          <img id="pic" src={post.picture} alt="error displaying pic"  />
        </>
      )
    })}

    </div>
    </>
  );



}
