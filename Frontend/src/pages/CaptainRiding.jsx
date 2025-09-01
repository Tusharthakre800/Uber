import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRiding from "../components/FinishRiding";
import LiveTracking from "../components/LiveTracking";
import RideRouteMap from "../components/RideRouteMap";

const CaptainRiding = () => {
  const [FinishRidePanel, setFinishRidePanel] = useState(false);
  const FinishRidePanelRef = useRef(null);

  const location = useLocation();
  const rideData = location.state?.ride;

  useGSAP(
    function () {
      if (FinishRidePanel) {
        gsap.to(FinishRidePanelRef.current, {
          transform: "translateY(0)",
          ease: "ease-out",
          duration: 1,
        });
      } else {
        gsap.to(FinishRidePanelRef.current, {
          transform: "translateY(100%)",
          ease: "ease-out",
          duration: 1,
        });
      }
    },
    [FinishRidePanel]
  );

  // Handle missing ride data
  if (!rideData) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-4">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
          <p className="text-gray-600">No ride data found. Please return to the dashboard.</p>
          <Link to="/captain-home" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen z-[1000] relative flex flex-col justify-end">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <Link to={"/captain-home"}>
          <div className="h-10 w-10 bg-white flex items-center justify-center rounded-full">
            <i className="text-lg font-medium ri-logout-box-r-line"></i>
          </div>
        </Link>
      </div>

      <div
        onClick={() => setFinishRidePanel(true)}
        className="h-1/5 p-3 z-[100] mb-5 flex items-center justify-between relative bg-yellow-400 pt-10"
      >
        <h5 className="p-1 text-center w-[95%] absolute top-0 text-3xl">
          <i className="font-semibold ri-arrow-up-wide-line"></i>
        </h5>

        <h4 className="text-xl font-semibold">{rideData?.distance || '0'} km</h4>
        <button className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
          Complete Ride
        </button>
      </div>
      
      <div
        ref={FinishRidePanelRef}
        className="fixed w-full z-[500] bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <FinishRiding 
          ride={rideData} 
          setFinishRidePanel={setFinishRidePanel} />
      </div>
      
      <div className="h-4/5 fixed w-screen top-0 left-0 z-[-1]">
        <RideRouteMap 
            pickup={rideData?.pickup}
            destination={rideData?.destination}
            pickupCoords={rideData?.pickupCoordinates}
            destinationCoords={rideData?.destinationCoordinates}
        />
        

      </div>
    </div>
  );
};

export default CaptainRiding;
