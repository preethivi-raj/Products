import React from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import {Link} from 'react-router-dom'
import baseUrl from '../BaseUrl/baseUrl'


const Header = () => {
    const {data:authUser}=useQuery({queryKey :["authUser"]})
    const {mutate:logout} = useMutation({
        mutationFn :async ()=>{
            try {
                const res = await fetch(`${baseUrl}/api/auth/logout`,{
                    method : 'POST',
                    credentials : 'include'
                })
                const data = await res.json()
                if(data.error){
                    throw new Error(data.error)
                }
                if(!res.ok){
                    throw new Error('Something went wrong')
                }
                return data
            } catch (error) {
                throw new Error(error)
            }
        },
        onSuccess : ()=>{
            window.location.href = '/'
        }
    })
    const handleLogout = ()=>{
        logout()
    }
  return (
    <div>
        <div className="navbar bg-base-100">
  <div className="flex-1">
    <Link to={"/"} className="btn btn-ghost text-xl">RAISON AUTOMATION</Link>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li className='uppercase'><p>User : {authUser?.fullName}</p></li>
      <li ><button onClick={handleLogout}>{"LOGOUT"}</button></li>
    </ul>
  </div>
</div>
<div className="divider divider-accent"></div>
    </div>
  )
}

export default Header