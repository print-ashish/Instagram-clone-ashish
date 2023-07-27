import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
// import { post } from "../../../backend/routes/auth";

export default function Home() {
  const [posts, setposts] = useState([]);
  const[item , setitem] = useState([]);
  const[comment, setcomment] = useState("");
  const navigate = useNavigate();
  const [showcmt , setshowcmt] = useState(false);
//comment on post 
const commentNow = (postId)=>
{
  if(comment !== "")
  {  
    console.log("frontend comment called");
    console.log(postId);
    fetch("/comment",
    {
      method:"put",
      headers:
      {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
      body :JSON.stringify({
          text: comment,
          postId: postId
      })
    }).then((res)=>res.json()).then((data)=>{
      console.log(data)
      setcomment("")
      const newData = posts.map((p)=>
      {
        if(p._id===  data._id)
        {
          return data;
        }
        else{
          return p;
        }
      })
      setposts(newData);

    })
  }
  else{
    alert("comment field is empty")
  }

  }


  //like post method
  const likepost = (postId) => {
    console.log("like post called");
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: postId,
      }),
    })
      .then((res) => res.json())
      .then((data) =>
      {
        const newData = posts.map((p)=>
        {
          if(p._id===  data._id)
          {
            return data;
          }
          else{
            return p;
          }
        })
        setposts(newData);
        console.log(data)
      }
      );
  };
  const unlikepost = (postId) => {
    console.log("unlike post called");
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: postId,
      }),
    })
      .then((res) => res.json())
      .then((data)=>
      {
        const newData = posts.map((p)=>
        {
          if(p._id === data._id)
          {
            return data;
          }
          else{
            return p;
          }
        })
        setposts(newData);
        console.log(data)
      }
      );
  };
  useEffect(() => {
    console.log("calling home")
    fetch("/home", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then(data => {
        if (data.error) {
          navigate("/signin");
        } else {
          console.log("data from home ");
          console.log(data);
          setposts(data);
          // console.log(data);
        }
      }).catch(err=>console.log("error while fetching",err));
  }, []);
const Togglecomments = (post)=>
{
  console.log(post)
  setitem(post);

  
   if(showcmt)
   { setshowcmt(false)
   }
   else{
    setshowcmt(true)
   }
  
}
  return (
    <>
      {/* <h1>Welcome to home page</h1> */}
      <div className="home">
        {/* Card */}
        {posts.map((post) => {
          return (
            <>
              <div className="card">
                {/* card header */}
                <div className="card-header">
                  <div className="card-pic">
                    <img
                      src="https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80"
                      alt="not loaded"
                    />
                  </div>
                  <h3>{post.postedBy.name}</h3>
                </div>
                {/* card-image */}
                <div className="card-image">
                  <img src={post.picture} alt="" />
                </div>
                {/* card-content */}
                <div className="card-content">
                  <div className="icons">
                    {/* {console.log(
                      JSON.parse(localStorage.getItem("userdata"))._id
                    )} */}
                    {post.likes.includes(
                      JSON.parse(localStorage.getItem("userdata"))._id
                    ) ? (
                   
                      <span
                        onClick={() => unlikepost(post._id)}
                        class="material-symbols-outlined like-red"
                      >
                        favorite
                      </span>

                    ) : (
                      <span
                        onClick={() => likepost(post._id)}
                        class="material-symbols-outlined"
                      >
                        favorite
                      </span>
                      
                    )}
                  </div>

                  <p>{post.likes.length} likes</p>
                  <p>{post.caption}</p>
                </div>
                {/* add-comment */}
                <div onClick={()=>Togglecomments(post)} id="viewcomments">view {post.comments.length} comments</div>
                <div className="comment-box">
                  <input type="text" value={comment} onChange={(event)=>{setcomment(event.target.value)}}  placeholder="add a comment" />
                  <button onClick={()=>commentNow(post._id)}>post</button>
                </div>
              </div>
            </>
          );
        })}


        { showcmt && 
         <>

         <div className="comment-show-box">
          <img src={item.picture} alt="unable to fetch img" />
          <div className="comment-panel">

              {/* card header */}
              <div className="card-header" style={{border:"1px solid black" , backgroundColor:"white", width:"500px" ,}}>
                  <div className="card-pic">
                    <img
                      src={item.picture}
                      alt="not loaded"
                    />
                  </div>
                  <h3 >{item.postedBy.name}</h3>
                </div>
              
             
             
             
               
               {item.comments.map((elem)=>
               {
                return <div className="user-comment">
                <h3>{elem.commentedBy.name}</h3>
                <h4>{elem.comment}</h4>
               </div>

               })}
               

            
         
              
              

  
               <div className="comment-box" style={{backgroundColor:"white", position:"fixed", width:"500px", borderTop:"1px solid grey", bottom:"55px"}}>
                  <input type="text" onChange={(event)=>{setcomment(event.target.value)}}  placeholder="add a comment" />
                  <button onClick={()=>{commentNow(item._id); Togglecomments()}}>post</button>
                </div>
            
       
             
          </div>
        </div>
        <div className="close-comment" style={{position:"fixed",  top:"20%", right :"12%"}}>
        <span onClick={()=>Togglecomments()} style= {{fontSize:"40px"}}class="material-symbols-outlined">
close
</span>

        </div>


         </>
         

        }
      </div>
    </>
  );
}
