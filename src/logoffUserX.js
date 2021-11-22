
import React from 'react';

export default function logoffUser(props) {
    
        async function fetchLogOff(){    
          if(props.token.length>1){
          const resp = await fetch('http://localhost:8080/user/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({
              token: props.token, 
              name: props.user
            })
           }) 
           props.setTok("");
           localStorage.removeItem("token");
           props.setLogIn("not logged in");     
           props.setUser("");
           props.setPassword("");
          }
          else alert("not logged in!")
        }
    

   return  ( <button className="fontX" onClick={e => {fetchLogOff()}}>
   Logoff</button>)
            
  }