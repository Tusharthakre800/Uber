import { useNavigate } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails"
import RidePopUp from "../components/RidePopUp"
import { useRef, useState  , useEffect , useContext} from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import CofirmRidePopUp from "./CofirmRidePopUp"
import { SocketContext } from "../context/SocketContext"
import { CaptainDataContext } from "../context/CaptainContext"
import axios from "axios"


function CaptainHome() {
  
  const RidePopupPanelRef = useRef(null)
  const CofirmRidePopUpPanelRef = useRef(null)

  const [ride, setRide] = useState(null)

  const [RidePopupPanel, setRidePopupPanel] = useState(false)
  const [CofirmRidePopupPanel, setCofirmRidePopupPanel] = useState(false)

  const { socket } = useContext(SocketContext)

  const { captain } = useContext(CaptainDataContext)

  const navigate = useNavigate()

  useEffect(() => {
    socket.emit("join",{
      userId: captain._id,
      userType: "captain"
    })
  
    const updateLocation = () => {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
        })
      })    
    }
}

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()    
  },[])
 
  socket.on('new-ride', (data) => {
    // console.log(data);    
    setRide(data)
    
    setRidePopupPanel(true)
    // console.log(setRide);
    

})

   const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/userlogin");
  };


  async function confirmRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      
      rideId: ride._id,
      captainId: captain._id,
      
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      } }
  )

    // console.log(response);
    
  // console.log(response);
  setRidePopupPanel(false)
  setCofirmRidePopupPanel(true)
  }

  useGSAP (function(){
    if (RidePopupPanel) {
      gsap.to(RidePopupPanelRef.current, {
       transform: "translateY(0)",
       ease: "ease-out",
       duration: 1  ,
      })
    }else{
      gsap.to(RidePopupPanelRef.current, {
        transform: "translateY(100%)",
        ease: "ease-out",
         duration: 1,
      
      })
    }
    }, [RidePopupPanel])
  useGSAP (function(){
    if (CofirmRidePopupPanel) {
      gsap.to(CofirmRidePopUpPanelRef.current, {
       transform: "translateY(0)",
       ease: "ease-out",
       duration: 1  ,
      })
    }else{
      gsap.to(CofirmRidePopUpPanelRef.current, {
        transform: "translateY(100%)",
        ease: "ease-out",
         duration: 1,
      
      })
    }
    }, [CofirmRidePopupPanel])
  return (
    
    <div className="h-screen">
    <div className="fixed p-6 top-0 flex items-center justify-between w-screen ">
      <img className="w-16 " src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <button
        onClick={handleLogout}
        className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
      >
        <i className="text-lg font-medium ri-logout-box-r-line"></i>
      </button>
    </div>
    <div className="h-3/5">
        <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

    </div>
    <div className="h-2/5 p-6">
      <CaptainDetails 
      ride={ride}
      />
    </div>
    <div  ref={RidePopupPanelRef} className=" fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
        <RidePopUp
        ride={ride}
        setRidePopupPanel={setRidePopupPanel} 
        setCofirmRidePopUpPanel={setCofirmRidePopupPanel} 
        confirmRide={confirmRide}
        />
      </div>
    <div  ref={CofirmRidePopUpPanelRef} className=" fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
        <CofirmRidePopUp
    
        ride={ride}     
        setCofirmRidePopUpPanel={setCofirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}  />
      </div>
</div>
  )
}

export default CaptainHome
