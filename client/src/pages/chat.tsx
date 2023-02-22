import { useEffect, useRef, useState } from 'react'
import { io, Socket } from "socket.io-client"
import Heading from '../components/chat/Heading'
import Conversation from '../components/chat/Conversation'
import ChatInput from '../components/chat/ChatInput'
import SideMenu from '../components/chat/SideMenu'
import SideDisplay from '../components/chat/SideDisplay'
import { ChatProvider } from '../context/chat/chatProvider'

const Chat = () => {
  let socket = useRef<Socket>()
  const user = JSON.parse(localStorage.getItem("chatUser") as string)

  useEffect(() => {
    socket.current = io("http://localhost:3000")
    socket.current.emit("add-user", user.publicId )
  }, [socket]);

  return (
    <ChatProvider>
      <div className='w-full h-full flex justify-center items-center'>
          <div className='flex overflow-hidden rounded-md h-full w-full bg-terceary'>
            <SideMenu/>
            <SideDisplay/>
            <div className='flex flex-col h-full w-full'>
              <Heading/>
              <Conversation/>
              <ChatInput/>
            </div>      
          </div>
      </div>
    </ChatProvider>
  )
}

export default Chat
