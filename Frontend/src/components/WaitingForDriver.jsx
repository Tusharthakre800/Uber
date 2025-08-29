  const WaitingForDriver = (props) => {
  return (
    <div className="mb-20">
    
    <div className="flex items-center justify-between">
        <img className="h-12" src="https://pngimg.com/d/mercedes_PNG80195.png" alt="car" />
        <div className="text-right p-2">
            <h2 className="text-lg font-medium capitalize">{props.ride?.captain.fullname.firstname}</h2>
            <h4 className="text-lg font-semibold -mt-1 -mb-1">{props.ride?.captain.vehicle.plate}</h4>
            <p className="text-xs text-grey-600">Maruti Suzuki Auto</p>
            <h1 className="text-base font-sans">{props.ride?.otp}</h1>
        </div>
    </div>
    <div className='flex gap-1 justify-normal flex-col items-center'>
        <div className='w-full mt-4'>
            <div className='flex items-center gap-4 p-2 border-t-2'>
                <i className="text-base ri-map-pin-user-fill"></i>
                <div>
                    <h3 className='text-base font-medium'>562/11-A</h3>
                    <p className='text-xs -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                </div>
            </div>
            <div className='flex items-center gap-4 p-2 border-t-2'>
                <i className="text-base ri-map-pin-2-fill"></i>
                <div>
                    <h3 className='text-base font-medium'>562/11-A</h3>
                    <p className='text-xs -mt-1 text-gray-600'>{props.ride?.destination}</p>
                </div>
            </div>
            <div className='flex items-center gap-4 p-2 border-t-2'>
            <i className="text-base ri-money-rupee-circle-fill"></i>
                <div>
                    <h3 className='text-base font-medium'>₹{props.ride?.fare}</h3>
                    <p className='text-xs -mt-1 text-gray-600'>Cash Cash</p>
                </div>
            </div>
        </div>
        
    </div>
    
</div>
  )
}

export default WaitingForDriver
