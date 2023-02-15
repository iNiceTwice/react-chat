import { useState } from 'react'
import logo from './assets/logo.png'
import io from "socket.io-client"
import ContactList from './components/ContactList'
import Heading from './components/Heading'
import Chat from './components/Chat'
import ChatInput from './components/ChatInput'
import SideMenu from './components/SideMenu'

const socket = io("http://localhost:3000")

function App() {
  

  return (
    <div className='w-full h-full flex justify-center items-center'>
        <div className='flex overflow-hidden rounded-md h-full md:h-[50rem] w-full lg:w-8/12 bg-terceary'>
          <SideMenu/>
          <ContactList/>
          <div className='flex flex-col h-full w-full'>
            <Heading/>
            <Chat/>
            <ChatInput/>
          </div>      
        </div>
    </div>
  )
}

export default App
