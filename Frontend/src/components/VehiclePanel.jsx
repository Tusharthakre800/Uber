const VehiclePanel = (props) => {
  return (
    <div className="">
      <h5 onClick={() => props.setVehiclePanel(false)} className="p-2 text-center text-2xl font-bold"><i className="absolute top-0 ri-arrow-down-s-line"></i></h5>
      <h2 className="text-xl font-semibold mb-4">Choose a Ride</h2> 
            <div className="text-center mb-4 p-4 bg-gradient-to-r from-blue-50 to-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex justify-center space-x-6">
                <div className="flex items-center">
                  <i className="ri-route-line text-xl text-blue-500 mr-2"></i>
                  <div>
                    <p className="text-base font-medium text-gray-800">Distance</p>
                    <p className="text-lg font-semibold text-blue-500">{props.kilometers}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="ri-time-line text-xl text-green-500 mr-2"></i>
                  <div>
                    <p className="text-base font-medium text-gray-800">Time</p>
                    <p className="text-lg font-semibold text-green-500">{props.minutes}</p>
                  </div>
                </div>
              </div>
            </div>
            <div onClick={() => {        props.setConfirmRidePanel(true)

        props.selectVehicle('car')
      }} className="flex border-2 active:border-black bg rounded-lg mb-2 w-full p-2 items-center justify-between">
        <img className="h-10" src="https://pngimg.com/d/mercedes_PNG80195.png" alt="" />
        <div className="w-1/2">
          <h4 className="font-medium text-sm">UberGo <span><i className="ri-user-fill text-blue-400"></i>4</span></h4>          <h5 className="font-medium text-xs">2 Mins away</h5>
          <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
        </div>
        <h2 className="text-lg font-semibold">₹{props.fare.car}</h2>
      </div>
      <div onClick={() => {
        props.setConfirmRidePanel(true)
        
        props.selectVehicle('moto')
      }} className="flex border-2 active:border-black bg rounded-lg mb-2 w-full p-2 items-center justify-between">
        <img className="-ml-2 h-10 bg-blend-multiply" src="https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cdni.autocarindia.com/autocar/Splendor-Pro-(Sep%2710)-(1)_0.jpg&w=700&c=1" alt="" />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-sm">UberGo <span><i className="ri-user-fill text-blue-400"></i>1</span></h4>
          <h5 className="font-medium text-xs">3 Mins away</h5>
          <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
        </div>
        <h2 className="text-lg font-semibold">₹{props.fare.moto}</h2>
      </div>
      <div onClick={() => {
        props.setConfirmRidePanel(true)
        props.selectVehicle('auto')
      }} className="flex border-2 active:border-black bg rounded-lg mb-2 w-full p-2 items-center justify-between">
        <img className="ml-2.5 h-10 bg-blend-multiply" src="https://res.cloudinary.com/dnreeobav/image/fetch/c_scale,q_30,w_350,f_auto/l_text:Arial_20_bold:TrucksBuses.com,x_70,y_100,co_rgb:ffffff/https://www.trucksbuses.com/uploads/7212_c5f0c8fb3095428ba2185f0e2d4ce6c7bajaj-re-diesel.jpg" alt="" />
        <div className="w-1/2">
          <h4 className="font-medium text-sm">UberGo <span><i className="ri-user-fill text-blue-400"></i>3</span></h4>
          <h5 className="font-medium text-xs">3 Mins away</h5>
          <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
        </div>
        <h2 className="text-lg font-semibold">₹{props.fare.auto}</h2>
      </div>
    </div>
  )
}

export default VehiclePanel
