  const ConfirmedRide = (props) => {
  return (
    <div>
            <h5 className="p-1 text-center w-[93%] absolute top-0 text-2xl " onClick={() => {
                props.setConfirmRidePanel(false)
                
            }
            } ><i className=" font-semibold ri-arrow-down-s-line ml-9"></i></h5>
            <h2 className="text-xl font-semibold mb-5">Confirm your Ride</h2>
            <div className='flex gap-2 justify-normal flex-col items-center'>
                <img className='h-16' src="https://pngimg.com/d/mercedes_PNG80195.png" alt="" />
                <div className='w-full mt-4'>
                    <div className='flex items-center gap-4 p-3 border-t-2'>
                    <i className=" text-base ri-map-pin-2-fill text-emerald-500"></i>
                    <div>
                            <h3 className='text-base font-medium'>562/11-A</h3>
                            <p className='text-xs -mt-1 text-gray-600'>{ props.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 p-3 border-t-2'>
                    <i className=" text-base ri-map-pin-2-fill text-red-500"></i>
                    <div>
                            <h3 className='text-base font-medium'>562/11-A</h3>
                            <p className='text-xs -mt-1 text-gray-600'>{props.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 p-3 border-t-2'>
                    <i className=" text-base ri-money-rupee-circle-fill text-yellow-500"></i>
                        <div>
                            <h3 className='text-base font-medium'>₹{props.fare[props.vehicleType]}</h3>
                            <p className='text-xs -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => {
                    props.setvehicleFound(true)
                    props.setConfirmRidePanel(false)
                    props.createRide()
                    }} className='w-full m-4 mt-6 mb-12 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
            </div>
            
    </div>
  )
}

export default ConfirmedRide
