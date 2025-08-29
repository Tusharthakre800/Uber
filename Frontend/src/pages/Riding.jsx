import { Link , useLocation , useNavigate } from "react-router-dom"
import { SocketContext } from "../context/SocketContext"
import { useContext} from "react"
import LiveTracking from "../components/LiveTracking"
const Riding = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const ride = location.state?.ride || {}
    const {socket} = useContext(SocketContext)

   socket.on('ride-ended', () => {
       navigate('/home')
   })

    // console.log(ride)
  return (
    <div className="h-screen">
        <Link to={"/home"}>
            <div className="fixed  right-2 top-2 h-8 w-8 bg-white flex items-center justify-center rounded-fullv ">
            <i className="text-base font-medium ri-home-4-line"></i>
            </div>
        </Link>
        <div className="h-1/2">
            <LiveTracking/>
        </div>
        <div className="h-1/2 p-3">
        <div className=" flex items-center justify-between">
        <img className="h-12" src="https://pngimg.com/d/mercedes_PNG80195.png" alt="car" />
        <div className="text-right">
            <h2 className="text-lg font-medium capitalize">{ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname }</h2>
            <h4 className="text-lg font-semibold -mt-1 -mb-1">{ride?.captain.vehicle.plate}</h4>
            <p className="text-xs text-grey-600">Maruti Suzuki Auto</p>
        </div>
    </div>
    <div className='flex gap-2 justify-normal flex-col items-center'>
        <div className='w-full mt-4'>
          
            <div className='flex items-center gap-4 p-2 border-t-2'>
                <i className="text-base ri-map-pin-2-fill"></i>
                <div>
                    <h3 className='text-base font-medium'>562/11-A</h3>
                    <p className='text-xs -mt-1 text-gray-600'>{ride?.destination}</p>
                </div>
            </div>
            <div className='flex items-center gap-4 p-2 border-t-2'>
            <i className="text-base ri-money-rupee-circle-fill"></i>
                <div>
                    <h3 className='text-base font-medium'>₹{ride?.fare}</h3>
                    <p className='text-xs -mt-1 text-gray-600'>Cash Cash</p>
                </div>
            </div>
        </div>
        
    </div>
            <button 
              className="w-full mt-4 p-2 bg-green-600 text-white font-semibold rounded-lg"
              onClick={() => navigate('/payment', { state: { ride } })}
            >
              Make a payment
            </button>
        </div>
    </div>
  )
}

export default Riding
