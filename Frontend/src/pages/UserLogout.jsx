import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const UserLogout = () => {

    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,{
        headers: {Authorization: `Bearer ${token}`}
    }).then((response)=>{
        if(response.status === 200) {
            localStorage.removeItem("token")
            navigate("/userlogin")
        }
    })

  return (
    <div>
      <h1>Logout</h1>
    </div>
  )
}

export default UserLogout
