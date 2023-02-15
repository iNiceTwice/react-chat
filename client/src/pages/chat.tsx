import { useState } from 'react'
import io from "socket.io-client"
import ContactList from '../components/chat/ContactList'
import Heading from '../components/chat/Heading'
import ChatMessages from '../components/chat/ChatMessages'
import ChatInput from '../components/chat/ChatInput'
import SideMenu from '../components/chat/SideMenu'

//const socket = io("http://localhost:3000")

function Chat() {  
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <div className='flex overflow-hidden rounded-md h-full w-full bg-terceary'>
          <SideMenu/>
          <ContactList/>
          <div className='flex flex-col h-full w-full'>
            <Heading/>
            <ChatMessages/>
            <ChatInput/>
          </div>      
        </div>
    </div>
  )
}

export default Chat
