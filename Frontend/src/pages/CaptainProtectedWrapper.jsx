
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CaptainDataContext } from "../context/CaptainContext"
import axios from "axios"



const CaptainProtectedWrapper = ({
    children
}) => {

    const token = localStorage.getItem("token")
    const navigate = useNavigate() 
    const {captain , setCaptain} = useContext(CaptainDataContext)
    const [isLoading , setIsLoading] = useState(true)
  
    
    useEffect(() => {
      if (!token) {
          navigate('/captainlogin')
      }

      axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }).then(response => {
          if (response.status === 200) {
              setCaptain(response.data.captain)
              setIsLoading(false)
          }
      })
          .catch(err => {

              localStorage.removeItem('token')
              navigate('/captainlogin')
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

export default CaptainProtectedWrapper
