import { useEffect, useRef, useState } from 'react'
import { io, Socket } from "socket.io-client"
import ContactList from '../components/chat/ContactList'
import Heading from '../components/chat/Heading'
import Conversation from '../components/chat/Conversation'
import ChatInput from '../components/chat/ChatInput'
import SideMenu from '../components/chat/SideMenu'

const Chat = () => {
  let socket = useRef<Socket>()
  const user = JSON.parse(localStorage.getItem("chatUser") as string)

  useEffect(() => {
    socket.current = io("http://localhost:3000")
    socket.current.emit("add-user", user.publicId )
  }, [socket]);

  return (
    <div className='w-full h-full flex justify-center items-center'>
        <div className='flex overflow-hidden rounded-md h-full w-full bg-terceary'>
          <SideMenu/>
          <ContactList/>
          <div className='flex flex-col h-full w-full'>
            <Heading/>
            <Conversation/>
            <ChatInput/>
          </div>      
        </div>
    </div>
  )
}

export default Chat
