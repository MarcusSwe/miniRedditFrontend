import React, { useState, useEffect } from "react";
import './App.css';

export default function PostSida(props){

 

    const [comments, setComments] = useState([]);
    let background = false;

    async function getComments(){        
        console.log(props.id);

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
    

    return (
        <div> 
 
            <div className="fontX postWrapper2">
            
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


/*


{posts.map((p,index) => <div key={p.id} index={index} className={changeBackgroundClassName()}><b className="voteSize">{p.upvote}</b>      
<UpVoteX token={token} id={p.id} yesGo={yesGo}/>       
<b className="voteSize"> {p.downvote} </b>
<DownVoteX token={token} id={p.id} yesGo={yesGo}/>
<b className="titleX">{p.title} </b>  <b className="authorX">{p.author}</b> {cutMessage(p.message)} <b className="dateY">{p.date}</b>

<button className="readButton" onClick={e =>{setSendPost({Title: p.title, Author: p.author, Date: p.date, Message: p.message}); 
setIdComment(p.id) ; console.log(idComment); setSida(2)}}> r e a d </button>

</div>)}       

*/


/*

  {comments.map((p,index) => <div key={p.id} index={index}>
            {p.commentAuthor}
            {p.comment}
            {p.date}            
            </div>)} 


            */

