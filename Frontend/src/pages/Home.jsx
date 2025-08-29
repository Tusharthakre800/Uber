import { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "./ConfirmedRide";
import LookingforDriver from "../components/LookingforDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import { SocketContext } from "../context/socketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

function Home() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelref = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [ConfirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setvehicleFound] = useState(false);
  const [waitingForDriver, setwaitingForDriver] = useState(false);

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);

  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);

  const [kilometers, setKilometers] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [ride, setRide] = useState(null);

  const navigate = useNavigate();

  const inputRefs = {
    pickup: useRef(null),
    destination: useRef(null),
  };

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
    return () => {
      socket.off("ride-confirmed");
      socket.off("ride-started");
    };

  }, [user, socket]);

  socket.on("ride-confirmed", (ride) => {
    setvehicleFound(false);
    setwaitingForDriver(true);
    setRide(ride);
  });

  socket.on("ride-started", (ride) => {
    console.log(ride);

    setwaitingForDriver(false);
    navigate("/riding", { state: { ride: ride } });
  });

  const swapLocations = () => {
    const tempPickup = pickup;
    setPickup(destination);
    setDestination(tempPickup);
  };

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setPickupSuggestions(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch {
      // console.log('error', error
    }
  };

  const findTrip = async () => {
    if (pickup === "" || destination === "") {
      alert("Please enter a pickup and destination");
    } else {
      setPanelOpen(false);
      setVehiclePanel(true);
    }
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const response2 = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/maps/get-distance-time`,
      {
        params: { origin: pickup, destination: destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );



    setKilometers(response2.data.distance.text);
    setMinutes(response2.data.duration.text);



    setFare(response.data);
  };

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
  }

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelref.current, {
          height: "70%",
          ease: "ease-out",
          duration: 1,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
          ease: "ease-out",
          duration: 1,
        });
      } else {
        gsap.to(panelref.current, {
          height: "0%",
          padding: 1,
          ease: "ease-out",
          duration: 1,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
          ease: "ease-out",
          duration: 1,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
          ease: "ease-out",
          duration: 1,
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
          ease: "ease-out",
          duration: 1,
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (ConfirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
          ease: "ease-out",
          duration: 1,
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
          ease: "ease-out",
          duration: 1,
        });
      }
    },
    [ConfirmRidePanel]
  );
  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
          ease: "ease-out",
          duration: 1,
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
          ease: "ease-out",
          duration: 1,
        });
      }
    },
    [vehicleFound]
  );
  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
          ease: "ease-out",
          duration: 1,
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
          ease: "ease-out",
          duration: 1,
        });
      }
    },
    [waitingForDriver]
  );

  const handleInputFocus = (ref) => {
    gsap.to(ref.current, {
      scale: 1.05,
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      duration: 0.3,
      ease: "ease-out",
    });
  };

  const handleInputBlur = (ref) => {
    gsap.to(ref.current, {
      scale: 1,
      boxShadow: "none",
      duration: 0.3,
      ease: "ease-out",
    });
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        alt=" rusgad"
      />
      <div className="h-4/5 w-screen z-[100000] ">
        <LiveTracking />
      </div>
      <div className="  flex flex-col justify-end h-screen absolute  top-0  w-full ">
        <div className="h-[28%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className=" absolute opacity-0 top-4 right-8 text-3xl font-bold "
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            className="relative "
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className=" line absolute h-16 w-1 top-[25%] left-6 bg-gray-900 rounded-full"></div>
            <div className="relative">
              <input
                ref={inputRefs.pickup}
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("pickup");
                }}
                onFocus={() => handleInputFocus(inputRefs.pickup)}
                onBlur={() => handleInputBlur(inputRefs.pickup)}
                value={pickup}
                onChange={handlePickupChange}
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
                type="text"
                placeholder="Add a pick-up location"
              />
              <i className="ri-map-pin-2-fill absolute left-4 top-1/2 -translate-y-1/2 text-lg"></i>
            </div>
            <div className="relative">
              <input
                ref={inputRefs.destination}
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("destination");
                }}
                onFocus={() => handleInputFocus(inputRefs.destination)}
                onBlur={() => handleInputBlur(inputRefs.destination)}
                value={destination}
                onChange={handleDestinationChange}
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3"
                type="text"
                placeholder="Enter your destination"
              />
              <i className="ri-map-pin-2-fill absolute left-4 top-1/2 -translate-y-1/2 text-lg"></i>
            </div>
            <button 
              onClick={swapLocations}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xl"
              type="button"
            >
              <i className="ri-arrow-up-down-fill font-bold "></i>
            </button>
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white py-2 mt-4 rounded-lg w-full"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelref} className="bg-white  h-0">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className=" fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-10 pt-12"
      >
        <VehiclePanel
          minutes={minutes}
          kilometers={kilometers}
          fare={fare}
          selectVehicle={setVehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className=" fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-6 pt-12"
      >
        <ConfirmedRide
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
          setvehicleFound={setvehicleFound}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed w-full translate-y-full z-10 bottom-0 bg-white "
      >
        <LookingforDriver
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setvehicleFound={setvehicleFound}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed w-full  z-10 bottom-0 bg-white "
      >
        <WaitingForDriver
          ride={ride}
          setvehicleFound={setvehicleFound}
          waitingForDriver={waitingForDriver}
          setwaitingForDriver={setwaitingForDriver}
        />
      </div>
    </div>
  );
}

export default Home;