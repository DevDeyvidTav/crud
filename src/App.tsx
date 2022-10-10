import { initializeApp } from "firebase/app"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Dashboard } from "./components/Dashboard/Dashboard"
import { Login } from "./components/Login/Login"
import { Register } from "./components/Register/Register"
import { AuthProvider } from "./context/AuthContext"
import  {onAuthStateChanged, User} from "firebase/auth"
import {useState, useEffect, useContext} from 'react'
import { useAuthentication } from "./hooks/useAuthentication"


export function App() {

  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()
  const loadingUser = user  === undefined
  console.log(user)
 
  useEffect(() => {
    onAuthStateChanged(auth, (user:any) => {
      setUser(user)
    })
  }, [auth])

  return (
    <AuthProvider  value={{user}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Login/>} />
          <Route path="/login" element={user ? <Dashboard /> : <Login /> } />
          <Route path="/register" element={user? <Dashboard /> : <Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}