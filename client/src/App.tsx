import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import Chat from "./pages/chat"
import Home from "./pages/home"
import Auth from "./auth/Auth"
import NotFound from "./pages/notFound"

function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chat' element={ <Auth><Chat/></Auth> }/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
