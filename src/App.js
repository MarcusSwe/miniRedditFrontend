import React, { useState, useEffect } from "react";
import './App.css';
import AddUserX from './addUserX';
import LoginUserX from './loginUserX';
import LogOffUserX from './logoffUserX';
import UpVoteX from './upVoteX';
import DownVoteX from './downVoteX';
import PostSida from './postSida';
import TestXX from './testX';
import TestYY from './testY';

function App() {

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState("not logged in");
  const [token, setToken] = useState("");
  const [posts, setPosts] = useState([]);
  const [omegaHook, callOmegaHook] = useState(true);
  const [sida, setSida] = useState(1);  
  const [sendPost, setSendPost] = useState();
  const [idComment, setIdComment]= useState();
  let background = false;
  

  const yesGo = () => {
    callOmegaHook(!omegaHook);
}
  
function getPosts(){
  fetch('http://localhost:8080/post/all', {
    method: 'GET'    
   })
    .then(resp => resp.json())
    .then(data =>{setPosts(data);console.log(data)});
}
useEffect(() => {  
    getPosts();  
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

function cutMessage(y){
    let message = y;
    let lenghtX = 25;
    let trimmedMessage = message.substring(0, 25);
    return trimmedMessage+"...";
}



function topMenu(){
  return (
    <div className="fontX"><img src="https://fontmeme.com/permalink/211116/662e47978ea0ad4aa807207649683392.png" 
    alt="graffiti-creator" border="0" onClick={e =>{setSida(1)}}/>
    <b className="moveUp"> Name: <input type="text" name="username" onChange={e => {setUser(e.target.value)}}/>
      Password: <input type="text" name="username" onChange={e => {setPassword(e.target.value)}}/>
      <LoginUserX setTok={setToken} setLogIn={setLoggedIn} user={user} password={password}/>
      <button className="fontX" onClick={e =>{AddUserX(user, password)}}> Register </button>  
      <LogOffUserX token={token} user={user} setTok={setToken} setLogIn={setLoggedIn}/>    
      {loggedIn}    
    </b>  
    </div>    
  )
}

function ChooseToPrint(){ 
  switch(sida){
    case 1:
      { 
        return PrintaMainSida(); }      
    case 2:
      { 
        return PrintaPostSida();}
    case 3:
      { 
        return PrintaNewPost();}
    default:{     
      return PrintaMainSida(); }
  }
}

function PrintaMainSida(){
  return  ( <div>
      {topMenu()}
      {posts.map((p,index) => <div key={p.id} index={index} className={changeBackgroundClassName()}><b className="voteSize">{p.upvote}</b>      
      <UpVoteX token={token} id={p.id} yesGo={yesGo}/>       
      <b className="voteSize"> {p.downvote} </b>
      <DownVoteX token={token} id={p.id} yesGo={yesGo}/>
      <b className="titleX">{p.title} </b>  <b className="authorX">{p.author}</b> {cutMessage(p.message)} <span className="dateY">{p.date}</span>
   
    <button className="readButton" onClick={e =>{setSendPost(p); setIdComment(p.id);  setSida(2)}}> r e a d </button>

   </div>)}       
  </div>
  );
}

function PrintaPostSida(){

  console.log(idComment);
  console.log(sendPost);
    return ( <div> 
        {topMenu()}
        <PostSida sendPost={sendPost} token={token} id={idComment} user={user} />
        </div>      
    )
}

function PrintaNewPost(){

}


  return (<div>{ChooseToPrint()}</div> 
  )



}

export default App;

