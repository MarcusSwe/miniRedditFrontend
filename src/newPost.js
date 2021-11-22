import React, { useState, useEffect } from "react";
import './App.css';

export default function NewPost(props){

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    function createPost() {

        const dateX = new Date();
        dateX.setHours(dateX.getHours()+1);

        if(title.length > 0 && message.length >0){
        
            async function fetchCreate(){
             const resp = await fetch('http://localhost:8080/post/newpost', {
                method: 'POST',
                headers: { 'token': props.token,
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({
                title: title,
                author: props.user,
                date: dateX,
                message: message
                })
            })
            const stringrespons = await resp.text();
            switch(resp.status) {
                case 409:         
                  alert(stringrespons)
                break;
                case 500:
                alert(stringrespons)
                break;
            default:
                   props.getPosts();
                return alert("post created")         
            }     
        } 
        fetchCreate(); 
        } else alert("No title or message!");          
      }
          

    return (
        <div>  
           <input placeholder="Title..." className="newPostTitle" size="150" value={title} onChange={e => setTitle(e.target.value)}/> 
           <br/>
           <textarea maxlength="700" placeholder="Message..." className="newPostMessage" onChange={e => {setMessage(e.target.value)}}>{message}</textarea>
           <br/>
           <button onClick={e => {createPost()}}> Submit</button>
      </div>
    )
}

