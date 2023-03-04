import Heading from '../components/chat/Heading'
import Conversation from '../components/chat/Conversation'
import ChatInput from '../components/chat/ChatInput'
import SideMenu from '../components/chat/SideMenu'
import SideDisplay from '../components/chat/SideDisplay'
import { ChatProvider } from '../context/chat/chatProvider'
import ContactProfile from '../components/chat/ContactProfile'

const Chat = () => {

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
            <div className="flex">
              <ContactProfile/>
            </div>      
          </div>
      </div>
    </ChatProvider>
  )
}

export default Chat
