import React, { useState ,useEffect} from 'react'
import "./CreatePost.css"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";



export default function CreatePost() {
    const navigate = useNavigate();
    const [file, setFile] = useState("https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg");
    const [caption, setcaption]  = useState("");
    const [image, setimage] = useState("");
    const [url, seturl] = useState();

    //Notification
    const toastError =(err)=>
    {
      toast.error(err)
  
    }
    const toastSuccess = (msg)=>
    {
      toast.success(msg);
      navigate("/home")
    }


    useEffect(() => {
        console.log(" url = ", url);
        if(url)
        {

        
        fetch("http://localhost:8000/createpost",
        {
            method :"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization": localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                caption,
                picture: url

            })

        }).then(res=>res.json())
        .then(data=>{
            if(data.message)
            {
                toastSuccess(data.message);
                navigate("/home");
            console.log(data);

            }
            else{
                toastError(data.error);
                navigate("/signin")
            }
            
        })
        .catch(err=>{
            toastError(err)
            console.log(err)});
    }
      
    }, [url])
    
    function handleChange(e) {
        
        setFile(URL.createObjectURL(e.target.files[0]));
       
        console.log(image);
    }
    //upload image to cloudinary
    const uploadpic = ()=>
    {
        console.log(localStorage.getItem("jwt"));

        console.log(caption);
        console.log(image);
        if(!caption || !image)
        {
            toastError("add all the fields");
            return;
        }
        const data = new FormData();
        data.append("file",image);
        data.append("upload_preset","insta-clone");
        data.append("cloud_name","ashishcloudinary7272");
        fetch("https://api.cloudinary.com/v1_1/ashishcloudinary7272/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(data=>{
            seturl(data.url)
            // console.log(data.url)
        })
        .catch(err=>console.log(err));

        
    
    
    }
    
  return (
    <div className="createpost-main">
        <div className="createpost-header">
            <h4>ashish_sharma4373</h4>
            <button onClick={uploadpic}>post</button>
        </div>
        <div className="createpost-img">
            <img src={file} alt="" />
        </div>
        <div className="createpost-footer">
            <input type="file" accept='image/*' onChange={(e)=>
            {
                handleChange(e);
                setimage(e.target.files[0])}}/>
            <textarea className='textar' name="" value={caption} placeholder='enter caption here' onChange={(e)=>{setcaption(e.target.value)}}>{caption}</textarea>

        </div>

    </div>
  )
}
