import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const FinishRiding = (props) => {

    const navigate = useNavigate()
    
    console.log(props.ride._id);
    
    async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {

            rideId : props.ride._id


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            navigate('/captain-home')
        }

    }

  return (
    <div >
    <h5 onClick={() =>{ 
                props.setFinishRidePanel(false)
    }} className="p-1 text-center w-[93%] absolute top-0 text-2xl " ><i className=" font-semibold ri-arrow-down-s-line"></i></h5>
         <h2 className="text-xl font-semibold mb-4">Finish this ride </h2>
         <div className="flex items-center justify-between p-2 rounded-lg bg-yellow-400 mt-3">
             <div className="flex items-center gap-2 ">
                 <img className="h-10 w-10 rounded-full object-cover" src=" https://www.shutterstock.com/image-photo/close-head-shot-portrait-preppy-260nw-1433809418.jpg" alt="" />
                 <h2 className="text-base font-medium">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
             </div>
         </div>
         <div className='flex gap-2 justify-normal flex-col items-center'>
             <div className='w-full mt-4'>
                 <div className='flex items-center gap-4 p-2 border-t-2'>
                    <i className="text-base ri-map-pin-2-fill text-emerald-500"></i>
                    <div>
                            <h3 className='text-base font-medium'>562/11-A</h3>
                            <p className='text-xs -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 p-2 border-t-2'>
                    <i className="text-base ri-map-pin-2-fill text-red-500"></i>
                        <div>
                            <h3 className='text-base font-medium'>562/11-A</h3>
                            <p className='text-xs -mt-1 text-gray-600'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 p-2 border-t-2 hover:bg-gray-50 transition-colors'>
                        <i className="text-base ri-route-line text-blue-600"></i>
                        <div>
                            <h3 className='text-base font-medium flex items-center gap-2'>
                                {props.ride?.distance} KM
                                <span className='text-xs text-gray-500'>(Estimated Distance)</span>
                            </h3>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 p-2 border-t-2'>
                    <i className="text-base ri-money-rupee-circle-fill text-yellow-500"></i>
                        <div>
                            <h3 className='text-base font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-xs -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
             </div>
         
             <div className="mt-5 w-full">
                 <button 
                 onClick={endRide}
                 className='flex text-base justify-center w-full mt-4 bg-green-600 text-white font-semibold p-2 rounded-lg'>Finish Ride</button>

                 <p className="text-red-400 mt-4 text-xs">By clicking Finish Ride, you agree to the terms and conditions of our service.</p>    
             </div>
         </div>
         
 </div>
  )
}

export default FinishRiding
