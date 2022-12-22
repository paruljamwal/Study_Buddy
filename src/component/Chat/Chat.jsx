import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import socketIO from 'socket.io-client';
import {user} from '../join/join'
import Message from '../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import './Chat.css'
import logo from './image/send.png'
import { Link, useNavigate } from 'react-router-dom';
import video from './video.svg'


let socket;
const ENDPOINT='https://studdybuddy.up.railway.app/';
const Chat = () => {
const [id,setId]=useState('');
const [messages,setMessages]=useState([])
const navigate=useNavigate()
//message 
    const send=()=>{
        const message=document.getElementById('chatInput').value;
         socket.emit("message",{message,id})
        document.getElementById("chatInput").value="";
    }

    
    useEffect(()=>{
     socket=socketIO(ENDPOINT,{transports:['websocket']})
    
    socket.on('connect',()=>{        // when dockrt on
        // alert("connected")
        setId(socket.id)
    })

       //send obj
      //  console.log(user,"u");
    socket.emit('joined',{user})

     socket.on('welcome',(data)=>{
        console.log(data,"data");
        setMessages([...messages, data]);
        console.log(data.user,data.message);
     })

     socket.on("userjoined",(data)=>{
        setMessages([...messages, data]);
        console.log(data.user,data.message)
     })

      socket.on('leave',(data)=>{
        setMessages([...messages, data]);
        console.log(data.user,data.message);
      })

    return()=>{
      socket.emit('disconnect');
      socket.off();
    }

  },[])


  // get message

  useEffect(()=>{
   socket.on("sendMessage",(data)=>{
    setMessages([...messages, data]);
    console.log(data.user,data.message,data.id);
   });

   return ()=>{
      socket.off();
   }

  },[messages]);


  return (
    <div className='chatPage' >
        <div className='chatContainer' >
            <div className='header' > 
            
            <h2>Study Buddy</h2>
         <span>
          
         <a href={`/video/${user}`} > <img style={{width:"40px"}} src={video} ></img></a>
          
          <a href='/' >  <img src={`https://cdn-icons-png.flaticon.com/128/8105/8105889.png`} alt="" /></a>
          </span> 
              </div>
                <ReactScrollToBottom className='chatbox' >
                  {
                    messages.map((item,i)=>(
                        <Message key={i} user={item.id===id ? '' : item.user} message={item.message} classs={item.id===id ? 'right' : "left"} />
                    ))
                  }
                </ReactScrollToBottom>
                <div className='inputbox' >
                  <input  onKeyPress={(e) => e.key === 'Enter' ? send() : null}  type={'text'} id='chatInput' />
                  <button onClick={send}  className='sendBtn' >
                    <img src={logo} alt='send' ></img>
                  </button>
                </div>
         
        </div>
          {/* <h1>{name}</h1> */}
    </div>
  )
}

export default Chat