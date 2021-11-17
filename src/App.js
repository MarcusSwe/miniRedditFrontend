import React, { useState, useEffect } from "react";
import './App.css';

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
  
 function addUser() {
  async function fetchAdd(){
    const resp = await fetch('http://localhost:8080/user/newuser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: user,
        password: password
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
       alert("user created")         
    }
  }
  fetchAdd();
}


function loginUser() {
  async function fetchLogin(){
    const resp = await fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name:user,
        password: password
      })
    })
    const tokenstring = await resp.text();
    if(resp.status===406){
      alert("something went wrong");
    } else {    
    setToken(tokenstring);
    console.log("tasdfasfasfasfasfasdfoken");
    console.log(token);
    setLoggedIn("logged in as: " + user);
    }
  }
  fetchLogin();
  
}

function logoffUser(){ 
  async function fetchLogOff(){    
    if(token.length>1){
    const resp = await fetch('http://localhost:8080/user/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({
        token: token, 
        name: user
      })
     }) 
     setToken("");
     setLoggedIn("not logged in");     
    }
    else alert("not logged in!")
  }
  fetchLogOff();
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
    <button className="fontX" onClick={e =>{loginUser()}}>Login</button><button className="fontX" onClick={e =>{addUser()}}>Register </button>
    <button className="fontX" onClick={e =>{logoffUser()}}>log off</button>{loggedIn} </b>  
      </div>     
      {posts.map((p,index) => <div key={p.id} index={index} className={changeBackgroundClassName()}><b className="voteSize">{p.upvote}</b>
       <button className="buttonVote" onClick={e => {upVote(p.id)}}> 	&#x21E7; </button> <b className="voteSize"> {p.downvote} </b> <button className="buttonVote" onClick
       ={e => downVote(p.id)}>&#x21E9; </button>  <b className="titleX">{p.title} </b>  <b className="authorX">{p.author}</b> {cutMessage(p.message)}</div>)}
    </div>
  );
}

export default App;
