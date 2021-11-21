
import React from 'react';
import './App.css';

export default function upVote(props) { 

    async function fetchUpVote(){
        const resp = await fetch('http://localhost:8080/post/voteup', {
          method: 'PUT',
          headers: { 'token': props.token,
          'id': props.id 
          }
        })     
        props.yesGo();        
      } 

   return  (   <button className="buttonVote" onClick={e => {fetchUpVote()}}> 	&#x21E7; </button>)
            
  }