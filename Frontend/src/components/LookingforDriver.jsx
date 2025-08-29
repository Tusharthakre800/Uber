  const LookingforDriver = (props) => {
      return (
          <div className="mb-20">
          <h5 className="p-2 text-center text-2xl pb-4" onClick={() => {
              props.setvehicleFound(false)
          }}>
              <i className="font-semibold ri-arrow-down-s-line"></i>
          </h5>
          <h2 className="text-xl font-semibold mb-4">Looking for a Driver</h2>
          <div className='flex gap-2 justify-normal flex-col items-center'>
              <img className='h-16' src="https://pngimg.com/d/mercedes_PNG80195.png" alt="" />
              <div className='w-full mt-3'>
                  <div className='flex items-center gap-4 p-2 border-t'>
                      <i className="text-base ri-map-pin-2-fill text-emerald-500"></i>
                      <div>
                          <h3 className='text-base font-medium'>562/11-A</h3>
                          <p className='text-xs text-gray-600'>{props.pickup}</p>
                      </div>
                  </div>
                  <div className='flex items-center gap-4 p-2 border-t'>
                      <i className="text-base ri-map-pin-2-fill text-red-500"></i>
                      <div>
                          <h3 className='text-base font-medium'>562/11-A</h3>
                          <p className='text-xs text-gray-600'>{props.destination}</p>
                      </div>
                  </div>
                  <div className='flex items-center gap-4 p-2 border-t'>
                      <i className="text-base ri-money-rupee-circle-fill text-yellow-500"></i>
                      <div>
                          <h3 className='text-base font-medium'>₹{props.fare[props.vehicleType]}</h3>
                          <p className='text-xs text-gray-600'>Cash Cash</p>
                      </div>
                  </div>
                  <br />
                  <br />
              </div>
          </div>
      </div>
      )
  }

  export default LookingforDriver
