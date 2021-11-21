import React, { useState, useEffect } from "react";
import './App.css';
import UpVoteX from './upVoteX2';
import DownVoteX from './downVoteX2';
import FromTime from './fromTimeX';

export default function PostSida(props){

    const [comments, setComments] = useState([]);
    const [upvote, setUpvote] = useState();
    const [downvote, setDownvote] = useState();
    const [omegaHook, callOmegaHook] = useState(true);    
    const [newCommentX, setNewComment] = useState(false);
    const [newAddComment, setAddComment] = useState("");
    const [updatePost, setUpdatePost] = useState(props.sendPost.message);
    const [updatePostTitle, setUpdatePostTitle] = useState(props.sendPost.title);
    const [updateComment, setUpdateComment] = useState("");
    const [idY, setIdY] = useState();
    let background = false;

  console.log("ddddddddddddddddddddddddddddddddddddddd")


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
        }, [omegaHook]);         

    function changeBackgroundClassName() {  
        if(background){
                background = false;
                return `fontX postWrapper postWrapperBackgroundOne`
              } else {      
                background = true;
                return `fontX postWrapper postWrapperBackgroundTwo` 
            }
        }  
  
        function changeBackgroundClassName2() {  
            if(background){                    
                    return `editPostComment postWrapperBackgroundTwo`
                  } else {                      
                    return `editPostComment postWrapperBackgroundOne` 
                }
            }  

    function getPost(){
        fetch('http://localhost:8080/post/' +props.id, {
        method: 'GET'    
        })
        .then(resp => resp.json())
        .then(data =>{setUpvote(data.upvote);setDownvote(data.downvote);setIdY(data.id)});
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
            dateX.setHours(dateX.getHours()+1);
            
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
                alert(stringrespons)         
            }    
            getComments();                   
        } 
        fetchCreate();        
        } else alert("No message!"); 
        yesGo();
    }

    
    function updatePost2(){   
        if(updatePost.length >2 && updatePostTitle.length >2){
            async function fetchCreate(){   
             const resp = await fetch('http://localhost:8080/post/updatepost', {
                method: 'PUT',
                headers: { 'token': props.token,
                'id': props.id,
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({                
                title: updatePostTitle,                
                message: updatePost              
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
            getPost();
            } 
        fetchCreate();     
        } else alert("Empty message or title!")     
    }

    function deletePost(){
        async function fetchCreate(){          

            const resp = await fetch('http://localhost:8080/post/postdelete', {
               method: 'DELETE',
               headers: { 'token': props.token,
               'id': idY,              
           }
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
           getPost();
           } 
       fetchCreate();  
    }

    function updateComment2(id){               

        if(updateComment.length > 1){

            async function fetchCreate(){          

             const resp = await fetch('http://localhost:8080/post/updatecomment', {
                method: 'PUT',
                headers: { 'token': props.token,
                'idcomment': id,
                'Content-Type': 'text/plain'
            },
                body: updateComment
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
            getPost();
            } 
        fetchCreate();     
        } else alert("Empty message or not updated!")        
        
       
    }

    function deleteComment2(id){
        async function fetchCreate(){          

            const resp = await fetch('http://localhost:8080/post/commentdelete', {
               method: 'DELETE',
               headers: { 'token': props.token,
               'id': id,              
           }
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
           getPost();
           } 
       fetchCreate();  
       yesGo();
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
        if(user === props.sendPost.author && props.loggedIn === "logged in as: "+user){
            return ``
        }else return`hidden` 
    }

    const showButton2 = (user) =>{
        if(user === props.user && props.loggedIn === "logged in as: "+user){
            return ``
        }else return`hidden` 
    }

    const openTextArea = (user) => {
        if(user === props.sendPost.author && props.loggedIn === "logged in as: "+user){
            return ""
        }else return "true" 
    }

    const openCommentTextArea = (user) => {        
        if(user === props.user && props.loggedIn === "logged in as: "+user){
            return ""
        }else return "true" 
    }

   
    

    return (
        <div>  
            <div className="fontX postWrapper2">
            
            <b className="voteSize">{upvote}</b>      
            <UpVoteX token={props.token} id={props.id} yesGo={yesGo} />       
            <b className="voteSize"> {downvote} </b>
            <DownVoteX token={props.token} id={props.id} yesGo={yesGo} />

           <textarea value={updatePostTitle} readOnly={openTextArea(props.user)} className="titleX2" onChange={e => {setUpdatePostTitle(e.target.value)}}>{props.sendPost.title}</textarea>
           <span className="authorX2">{props.sendPost.author}</span>
           <span className="dateZ">{props.sendPost.date.substring(0,16)}</span>
           <textarea value={updatePost} maxlength="700" readOnly={openTextArea(props.user)} className="editPostM" onChange={e => {setUpdatePost(e.target.value)}}>{props.sendPost.message}</textarea>
          

            </div>     
            <button onClick={e => {newComment()}}>new comment</button>      
            <button className={showButton1(props.user)} onClick={e => {updatePost2()}}> update post </button>
            <button className={showButton1(props.user)} onClick={e => {deletePost()}}> delete post </button>

            {newC(newCommentX)}

             {comments.map((p,index) => <div key={p.id} index={index} className={changeBackgroundClassName()}>            
           <b className="titleX"> {p.commentAuthor} </b>
            <span className="commentDate">  <FromTime timeComment={p.date.substring(0,16)}/>   </span>
           
            <textarea readOnly={openCommentTextArea(p.commentAuthor)} className={changeBackgroundClassName2()} onChange={e => {setUpdateComment(e.target.value)}}>{p.comment}</textarea>              

            <button className={showButton2(p.commentAuthor)} onClick={e=>{updateComment2(p.id)}}> update comment </button>
            <button className={showButton2(p.commentAuthor)} onClick={e=>{deleteComment2(p.id)}}> delete comment </button>

            </div>)} 

      </div>
    )
}


