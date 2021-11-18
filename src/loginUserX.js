
import React from 'react';

export default function loginUser(props) {
    
    async function fetchLogin(){       
    
        const resp = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: props.user,
          password: props.password
        })
      })
      const tokenstring = await resp.text();
      if(resp.status===406){        
        alert("something went wrong");        
      } else {    
        props.setTok(tokenstring);      
        props.setLogIn("logged in as: " + props.user);
      }
    }

   return  ( <button className="fontX" onClick={e => {fetchLogin()}}>
   Login</button>)
            
  }