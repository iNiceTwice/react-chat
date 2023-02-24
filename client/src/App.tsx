import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import Chat from "./pages/chat"
import Home from "./pages/home"
import Auth from "./auth/Auth"

function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chat' element={ <Auth><Chat/></Auth> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
