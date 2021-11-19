import React, { useState, useEffect } from "react";
import './App.css';
import UpVoteX from './upVoteX';
import DownVoteX from './downVoteX';

export default function PostSida(props){

    const [comments, setComments] = useState([]);
    const [upvote, setUpvote] = useState();
    const [downvote, setDownvote] = useState();
    const [omegaHook, callOmegaHook] = useState(true);    
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

             {comments.map((p,index) => <div key={p.id} index={index} className={changeBackgroundClassName()}>            
           <b className="titleX"> {p.commentAuthor} </b>
            <span className="commentDate">{p.date} </span>
            {p.comment}
                      
            </div>)} 

      </div>
    )
}


