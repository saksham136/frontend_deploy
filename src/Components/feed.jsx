import "./feed.css"
import Share from "./Share"
import Post from "./Post"
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

import { useState, useEffect, useContext } from "react"


export default function Feed({username}) {

  const [posts, setPosts]=useState([]);
  const [text,setText]=useState("");
  const {user}=useContext(AuthContext);


  useEffect(()=>{
    const fetchPosts= async ()=>{
      const res= username ?await axios.get("/posts/profile/" + username) :
       await axios.get("posts/timeline/"+user._id);
      setPosts(res.data.sort((p1,p2 )=>{ return new Date(p2.createdAt)-new Date(p1.createdAt)}));
    }
    fetchPosts();
   
  },[username,user._id])

  return (
    <div className='feed'>
      <input type="text" onChange={(e)=>{setText(e.target.value)}}/>
      <div className="feedaWrapper">
      { <Share/>}
      {posts.map((p)=>(
       <Post  key={p._id} post={p}/>
      ))}
     
     
      
      </div>
    </div>
  )
};
