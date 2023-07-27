import React, { useState , useEffect} from "react";
import "./Profile.css";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate()
  const toastError =(err)=>
    {
      toast.error(err)
  
    }
    const toastSuccess = (msg)=>
    {
      toast.success(msg);
      // navigate("/home")
    }

  const deletepost = (postId)=>
  {
    let text = "Press a button!\nEither OK or Cancel.";
    if (window.confirm(text) == true) {
      // text = "You pressed OK!";
      console.log("delete post called for id = "+ postId)
      fetch("/deletepost",
      {
        method:"delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          postId: postId,
        }),
      }).then(res=>res.json())
        .then(data=>
          {
            if(data)
            {
              // console.log("post deleted successfully",data)
              toastSuccess("Post deleted Successfully")
            }
            else{
              toastError("Unable to delete post")
              // console.log("unable to delete post");

            }
          }).catch(err=>{
            toastError(err)

          });
    } 
     
  }

  const [mypost ,setmyposts] = useState([]);
  const [userdetails, setuserdetails] = useState("");
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
          // console.log(mypost);
          setmyposts(data.postsdata);
          setuserdetails(data.userdetails);

          
        // console.log(data);

        }
      
      });
  }, [mypost , userdetails]);
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
              {/* <h3>{JSON.parse(localStorage.getItem("userdata")).followers.length}</h3> */}
              <h3>{userdetails?userdetails.followers.length:0}</h3>
              <p>Followers</p>
            </div>
            <div className="following">
            {/* <h3>{JSON.parse(localStorage.getItem("userdata")).following.length}</h3> */}
            <h3>{userdetails?userdetails.following.length:0}</h3>
            <p>Following</p>
            </div>
        
          </div>
          <div className="thirdsection">
                <h4>{JSON.parse(localStorage.getItem("userdata")).name}</h4>
                <p>{JSON.parse(localStorage.getItem("userdata")).bio}</p>

          </div>
        </div> 
      </div>
    </div>
    <div className="gallery">
    {mypost.slice(0).reverse().map((post)=>
    {
      return(
        <>
          <img id="pic" src={post.picture} alt="error displaying pic"  /><span id="postbtn" onClick={()=>{deletepost(post._id)}} class="material-symbols-outlined">
delete
</span>
        </>
      )
    })}

    </div>
    </>
  );
}
