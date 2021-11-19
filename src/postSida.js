import React, { useState, useEffect } from "react";
import './App.css';
import UpVoteX from './upVoteX';
import DownVoteX from './downVoteX';

export default function PostSida(props){

    const [comments, setComments] = useState([]);
    const [upvote, setUpvote] = useState();
    const [downvote, setDownvote] = useState();
    const [omegaHook, callOmegaHook] = useState(true);    
    const [newCommentX, setNewComment] = useState(false);
    const [newAddComment, setAddComment] = useState("");
    let background = false;

    const yesGo = () => {
        callOmegaHook(!omegaHook);
      }

    async function getComments(){        
        console.log(props.id);
        setUpvote(props.sendPost.upvote);
        setDownvote(props.sendPost.downvote);

         fetch('http://localhost:8080/post/getcomments', {
            method: 'GET',    
            headers: {'idpost': props.id} 
           })
            .then(resp => resp.json())
            .then(data =>{setComments(data);console.log(data)});
            console.log(comments);
        
         }
        useEffect(() => {  
            getComments();              
        }, []);         

    function changeBackgroundClassName() {  
        if(background){
                background = false;
                return `fontX postWrapper postWrapperBackgroundOne`
              } else {      
                background = true;
                return `fontX postWrapper postWrapperBackgroundTwo` 
            }
        }  
  
    function getPost(){
        fetch('http://localhost:8080/post/' +props.id, {
        method: 'GET'    
        })
        .then(resp => resp.json())
        .then(data =>{setUpvote(data.upvote);setDownvote(data.downvote);console.log(data)});
    }
    useEffect(() => {  
        getPost();  
    }, [omegaHook]);          

    function newComment(){        
        setNewComment(!newCommentX)       
    }

    function addComment(){
        if(newAddComment.length >0){        
            const dateX = new Date();
            async function fetchCreate(){
             const resp = await fetch('http://localhost:8080/post/newcomment', {
                method: 'POST',
                headers: { 'token': props.token,
                'id': props.id,
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({                
                commentAuthor: props.user,                
                comment: newAddComment,
                date: dateX
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
                return alert(stringrespons)         
            }     
        } 
        fetchCreate(); 
        } else alert("No message!"); 
    }

   function newC(i) {
        if(i){
            return (<div className={newC()} > 
            <div className="newCommentWrapper">
            <textarea maxlength="700" placeholder="Message..." className="newPostMessage" onChange={e => {setAddComment(e.target.value)}}>{newAddComment}</textarea>
           <br/>
           <button onClick={e => {addComment()}}> Submit</button>
           </div>
             </div>)
        } else return ``
    }

    const showButton1 = (user) =>{
        console.log(user);
        console.log(props.sendPost.author);
        if(user === props.sendPost.author && props.loggedIn === "logged in as: "+user){
            return ``
        }else return`hidden` 
    }

    const showButton2 = (user) =>{
        if(user === props.sendPost.author){

        }
    }

    return (
        <div>  
            <div className="fontX postWrapper2">
            
            <b className="voteSize">{upvote}</b>      
            <UpVoteX token={props.token} id={props.id} yesGo={yesGo} />       
            <b className="voteSize"> {downvote} </b>
            <DownVoteX token={props.token} id={props.id} yesGo={yesGo} />

           <span className="titleX2">{props.sendPost.title}</span>
           <span className="authorX2">{props.sendPost.author}</span>
           <span className="dateZ">{props.sendPost.date}</span>
           <span className="messageZ">{props.sendPost.message}</span>

            </div>     
            <button onClick={e => {newComment()}}>new comment</button>      
            <button className={showButton1(props.user)}> update post </button>
            <button className={showButton1(props.user)}> delete post </button>

            {newC(newCommentX)}

             {comments.map((p,index) => <div key={p.id} index={index} className={changeBackgroundClassName()}>            
           <b className="titleX"> {p.commentAuthor} </b>
            <span className="commentDate">{p.date} </span>
            {p.comment}
            <button className={showButton2(props.user)}> update comment </button>
            <button className={showButton2(props.user)}> delete comment </button>

            </div>)} 

      </div>
    )
}


