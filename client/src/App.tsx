import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import Chat from "./pages/chat"
import Home from "./pages/home"

interface Props {
  children: JSX.Element | JSX.Element[]
}

const Auth = ({children}:Props) => {
  if(!localStorage.getItem("token")){
    return <Navigate to="/login" replace={true} />
  }
  return children
}

function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
