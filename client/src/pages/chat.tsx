import Heading from '../components/chat/Heading'
import Conversation from '../components/chat/Conversation'
import ChatInput from '../components/chat/ChatInput'
import SideMenu from '../components/chat/SideMenu'
import SideDisplay from '../components/chat/SideDisplay'
import { ChatProvider } from '../context/chat/chatProvider'
import MobileChat from "../components/chat/MobileChat"
import ContactProfile from '../components/chat/ContactProfile'
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
