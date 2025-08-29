  const RidePopUp = (props) => {
  return (
    <div>
       <h5  onClick={() => props.setRidePopupPanel(false)} className="p-1 text-center w-[93%] absolute top-0 text-2xl " ><i className=" font-semibold ri-arrow-down-s-line"></i></h5>
            <h2 className="text-xl font-semibold mb-5">New Ride available!</h2>
            <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-400 mt-4 hover:bg-yellow-500 transition-all shadow-md">
                <div className="flex items-center gap-3">
                    <img className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-lg hover:scale-110 transition-transform" src=" https://www.shutterstock.com/image-photo/close-head-shot-portrait-preppy-260nw-1433809418.jpg" alt="" />
                    <h2 className="text-base font-medium text-gray-800 hover:text-gray-900">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
                </div>
            </div>
            <div className='flex gap-2 justify-normal flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-t-2 hover:bg-gray-50 transition-colors'>
                        <i className=" text-base ri-map-pin-2-fill text-emerald-500"></i>
                        <div>
                            <h3 className='text-base font-medium'>562/11-A</h3>
                            <p className='text-xs -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-t-2 hover:bg-gray-50 transition-colors'>
                        <i className=" text-base ri-map-pin-2-fill text-red-500"></i>
                        <div>
                            <h3 className='text-base font-medium'>562/11-A</h3>
                            <p className='text-xs -mt-1 text-gray-600'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-t-2 hover:bg-gray-50 transition-colors'>
                        <i className="text-base ri-route-line text-blue-600"></i>
                        <div>
                            <h3 className='text-base font-medium flex items-center gap-2'>
                                {props.ride?.distance} KM
                                <span className='text-xs text-gray-500'>(Estimated Distance)</span>
                            </h3>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-t-2 hover:bg-gray-50 transition-colors'>
                    <i className=" text-base ri-money-rupee-circle-fill text-yellow-500"></i>
                        <div>
                            <h3 className='text-base font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-xs -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => {
                    props.setCofirmRidePopUpPanel(true)
                    props.confirmRide()
                    }}  className='w-full m-1 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
                <button onClick={() => props.setRidePopupPanel(false)} className='w-full  bg-red-600 text-gray-700 font-semibold p-2 rounded-lg'>Ingore</button>
            </div>            
    </div>
  )
}

export default RidePopUp
