import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Signin from './Pages/Auth/Signin'
import Signup from './Pages/Auth/Signup'
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import baseUrl from "./BaseUrl/baseUrl";
import { Navigate } from 'react-router-dom';
import Loading from "./Common/Loading";
import Header from './Common/Header';

const App = () => {
  const {data : authUser , isLoading}= useQuery({
    queryKey : ['authUser'],
    queryFn : async()=>{
      try {
        const res = await fetch(`${baseUrl}/api/auth/me`,{
           credentials: 'include',
        })
        const data = await res.json()
        if(data.error){
          return null;
        }
        if(!res.ok){
          throw new Error(data.error || 'Something went wrong')
        }
        return data
      } catch (error) {
        throw new Error(error)
      }
    },
    retry : false,
  })
  if(isLoading){
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading/>
      </div>
    )
  }
  return (
    <div>
      {authUser && <Header/>}
      <Routes>
        <Route path="/" element={authUser?<Home/> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser?<Signup /> : <Navigate to="/"/>} />
        <Route path="/login" element={!authUser ?<Signin />:<Navigate to="/"/> } />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App