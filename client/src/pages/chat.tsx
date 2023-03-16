import { ChatProvider } from '../context/chat/chatProvider'
import MobileChat from "../components/chat/MobileChat"
import DesktopChat from '../components/chat/DesktopChat'
import { ToastContainer } from 'react-toastify'

const Chat = () => {

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
