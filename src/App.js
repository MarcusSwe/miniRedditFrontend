import React, { useState, useEffect } from "react";
import './App.css';
import AddUserX from './addUserX';
import LoginUserX from './loginUserX';
import LogOffUserX from './logoffUserX';
import testCP from './testX';
import testCP2 from './testY';

function App() {

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState("not logged in");
  const [token, setToken] = useState("");
  const [posts, setPosts] = useState([]);
  const [omegaHook, callOmegaHook] = useState(true);
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

function upVote(id){
  console.log(id);
  console.log(token);
  async function fetchUpVote(){
    const resp = await fetch('http://localhost:8080/post/voteup', {
      method: 'PUT',
      headers: { 'token': token,
      'id': id 
      }
    })
    yesGo();
  }
  fetchUpVote();
}

function downVote(id){
  console.log(id);
  console.log(token);
  async function fetchDownVote(){
    const resp = await fetch('http://localhost:8080/post/votedown', {
      method: 'PUT',
      headers: { 'token': token,
      'id': id 
      }
    })
    yesGo();
  }
  fetchDownVote();  
}



  return (
    <div >
     <div className="fontX"><a href="https://fontmeme.com/graffiti-creator/"><img src="https://fontmeme.com/permalink/211116/662e47978ea0ad4aa807207649683392.png" 
     alt="graffiti-creator" border="0"/></a>
   <b className="moveUp"> Name: <input type="text" name="username" onChange={e => {setUser(e.target.value)}}/>
    Password: <input type="text" name="username" onChange={e => {setPassword(e.target.value)}}/>

    <LoginUserX 
       setTok={setToken}
       setLogIn={setLoggedIn}     
       user={user}
       password={password}
    />
      

      <button className="fontX" onClick={e =>{AddUserX(user, password)}}> Register </button>

  
      <LogOffUserX
      token={token}
      user={user}
      setTok={setToken}
      setLogIn={setLoggedIn}
    />
      

    
    {loggedIn}
    
     </b>  
      </div>     
      {posts.map((p,index) => <div key={p.id} index={index} className={changeBackgroundClassName()}><b className="voteSize">{p.upvote}</b>
       <button className="buttonVote" onClick={e => {upVote(p.id)}}> 	&#x21E7; </button> <b className="voteSize"> {p.downvote} </b> <button className="buttonVote" onClick
       ={e => downVote(p.id)}>&#x21E9; </button>  <b className="titleX">{p.title} </b>  <b className="authorX">{p.author}</b> {cutMessage(p.message)}
       <button className="readButton" onClick={e =>{}}> r e a d </button>
       </div>)}       
    </div>
  );
}

export default App;

