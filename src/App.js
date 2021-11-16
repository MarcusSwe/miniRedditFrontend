import React, { useState, useEffect } from "react";
import './App.css';

function App() {

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState("not logged in");
  const [token, setToken] = useState("");
  const [posts, setPosts] = useState([]);


  
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
}, []);


  return (
    <div >
     <div>
    Name: <input type="text" name="username" onChange={e => {setUser(e.target.value)}}/>
    Password: <input type="text" name="username" onChange={e => {setPassword(e.target.value)}}/>
    <button onClick={e =>{loginUser()}}>Login</button><button onClick={e =>{addUser()}}>Register </button>
    <button onClick={e =>{logoffUser()}}>log off</button>{loggedIn}   
      </div>     
      {posts.map((p,index) => <div key={p.id} index={index} className="postWrapper">{p.title}</div>)}
    </div>
  );
}

export default App;
