import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './join.css';


let user;
const sendUser=()=>{
    // console.log(name,"l");
    user=document.getElementById('joinInput').value;
    document.getElementById('joinInput').value='';
    
}


const Join = () => {
   
    const [name,setName]=useState("");
    

    // console.log(name)
  return (
    <div className='joinPage' >
        <div className='joinContainer' >
            <img src='https://cdn-icons-png.flaticon.com/128/7376/7376559.png'  alt='logo' />
          <h1> Study Buddy </h1>  
           <input value={name} onChange={(e)=>setName(e.target.value)}  placeholder='Enter your name....' type='text' id='joinInput' ></input>
    
           <Link to='/chat' onClick={(e)=> !name ? e.preventDefault():null}> <button  onClick={sendUser} className='joinBtn' >Start</button>  </Link>
        </div>

    </div>
  )
}

export default Join
export {user}