
import React from 'react';

export default function FromTime(props){ 

    const timeNow = new Date();      
   
    const commentpostMin = parseInt(props.timeComment.substring(14,16));
    const commentpostHour = parseInt(props.timeComment.substring(11,13));    
    const commentpostDay = parseInt(props.timeComment.substring(8,11));
    const commentpostMonth = parseInt(props.timeComment.substring(5,8));
    const commentpostYear = parseInt(props.timeComment.substring(0,5));   
 
    const timePostComment = new Date(commentpostYear,commentpostMonth-1, commentpostDay,
        commentpostHour, commentpostMin, 1, 1);               

    const differenceInTime = timeNow.getTime()-timePostComment.getTime();

    const yearInMS = 31536000000;
    const monthInMS = 2628000000;
    const dayInMS = 86400000;
    const hourInMS = 3600000;
    const minInMS = 60000;     
      
    const years = Math.floor(differenceInTime/yearInMS);      
    const months = Math.floor((differenceInTime%yearInMS)/monthInMS);              
    const days = Math.floor(differenceInTime%yearInMS%monthInMS/dayInMS);       
    const hours = Math.floor(differenceInTime%yearInMS%monthInMS%dayInMS/hourInMS);       
    const minutes = Math.floor(differenceInTime%yearInMS%monthInMS%dayInMS%hourInMS/minInMS);
      
    console.log(differenceInTime);

    if(differenceInTime < minInMS*2){
        return <span>Submitted just now!</span>  
    } else if(differenceInTime < hourInMS && differenceInTime > minInMS*2) {
        return <span>Submitted {minutes} minutes ago!</span>
      } else if(differenceInTime > hourInMS && differenceInTime<dayInMS){
           return <span>Submitted {hours} hours ago!</span>
        } else if(differenceInTime > dayInMS && differenceInTime < months){
            return <span>Submitted {days} days ago!</span>
            } else if(differenceInTime > months && differenceInTime < years){
                return <span>Submitted {months} months ago!</span>
                } else if(differenceInTime > years){
                    return <span>Submitted {years} years ago!</span>
                    } else return <span>Submitted unknown time ago!</span>


}