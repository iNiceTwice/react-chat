import { ChatProvider } from '../context/chat/chatProvider'
import MobileChat from "../components/chat/MobileChat"
import DesktopChat from '../components/chat/DesktopChat'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'

const Chat = () => {
  const { theme } = JSON.parse(localStorage.getItem("chatUser") as string) 

  useEffect(() => {
    theme === "dark" ?
    document.querySelector("html")?.classList.add("dark")
    :
    document.querySelector("html")?.classList.remove("dark")

  }, []);

  return (
    <ChatProvider>
      <DesktopChat/>
      <MobileChat/>
      <ToastContainer
        theme="colored"
      />
    </ChatProvider>
  )
}

export default Chat
