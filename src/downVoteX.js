
import React from 'react';
import './App.css';

export default function downVote(props) {
    
    async function fetchDownVote(){
        const resp = await fetch('http://localhost:8080/post/votedown', {
          method: 'PUT',
          headers: { 'token': props.token,
          'id': props.id 
          }
        })
        props.yesGo();
      }
      

   return  (   <button className="buttonVote" onClick={e => {fetchDownVote()}}> 	&#x21E9; </button>)
            
  }