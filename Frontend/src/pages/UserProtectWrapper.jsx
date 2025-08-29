import { useContext, useEffect, useState } from "react"
import { UserDataContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import axios from 'axios'



const UserProtectWrapper = ({
    children
}) => {

    const token = localStorage.getItem("token")
    const navigate = useNavigate() 
    const {user , setUser} = useContext(UserDataContext)
    const [isLoading, setIsLoading] =useState(true)
    

   
    useEffect(() => {
        if (!token) {
            navigate('/login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data)
                setIsLoading(false)
            }
        })
            .catch(err => {
                console.log(err)
                localStorage.removeItem('token')
                navigate('/userlogin')
            })
    }, [ token ])

    if(isLoading) return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500">
              </div>
        </div>   )
   
    
    
  return (
    <>
      {children}
    </>
  )
}

export default UserProtectWrapper
