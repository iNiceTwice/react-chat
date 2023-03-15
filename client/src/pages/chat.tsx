import { ChatProvider } from '../context/chat/chatProvider'
import MobileChat from "../components/chat/MobileChat"
import DesktopChat from '../components/chat/DesktopChat'

const Chat = () => {

  return (
    <ChatProvider>
      <DesktopChat/>
      <MobileChat/>
    </ChatProvider>
  )
}

export default Chat
