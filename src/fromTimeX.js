
import React from 'react';

export default function FromTime(props){

 

    const noW = new Date();

    const noWyear = noW.getFullYear();
    const noWday = noW.getDate();
    const noWmonth = noW.getMonth();
    const noWhour = noW.getHours();
    const noWTime = noW.getMinutes();

    const timeMin = props.timeComment.substring(14,16);

    const timePassed = noWTime - parseInt(timeMin);

   

    return timePassed;




    /*
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
    */



}