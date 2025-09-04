import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CofirmRidePopUp = (props) => {
  const [otp, setopt] = useState();

  const navigate = useNavigate();


  
  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
      {
        params: {
          rideId: props.ride._id,
          otp: otp,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      props.setCofirmRidePopUpPanel(false);
      props.setRidePopupPanel(false);
      navigate("/captainriding ", { state: { ride: props.ride } });
    }
  };

  return (
    <div>
      <h5
        onClick={() => {
          props.setCofirmRidePopUpPanel(false);
          props.setRidePopupPanel(false);
        }}
        className="p-1 text-center w-[93%] absolute top-0 text-2xl "
      >
        <i className=" font-semibold ri-arrow-down-s-line"></i>
      </h5>
      <h2 className="text-xl font-semibold mb-5">Confirm this ride to Start</h2>
      <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-400 mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src=" https://www.shutterstock.com/image-photo/close-head-shot-portrait-preppy-260nw-1433809418.jpg"
            alt=""
          />
          <h2 className="text-base font-medium capitalize">
            {props.ride?.user.fullname.firstname +
              " " +
              props.ride?.user.fullname.lastname}
          </h2>
        </div>
      </div>
      <div className="flex gap-2 justify-normal flex-col items-center">
        <div className="w-full mt-4">
          <div className="flex items-center gap-4 p-2 border-t-2">
            <i className="text-base ri-map-pin-2-fill text-emerald-500"></i>
            <div>
              <h3 className="text-base font-medium">562/11-A</h3>
              <p className="text-xs -mt-1 text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2 border-t-2">
            <i className="text-base ri-map-pin-2-fill text-red-500"></i>
            <div>
              <h3 className="text-base font-medium">562/11-A</h3>
              <p className="text-xs -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2 border-t-2 hover:bg-gray-50 transition-colors">
            <i className="text-base ri-route-line text-blue-600"></i>
            <div>
              <h3 className="text-base font-medium flex items-center gap-2">
                {props.ride?.distance} KM
                <span className="text-xs text-gray-500">
                  (Estimated Distance)
                </span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2 border-t-2">
            <i className="text-base ri-money-rupee-circle-fill text-yellow-500"></i>
            <div>
              <h3 className="text-base font-medium">₹{props.ride?.fare}</h3>
              <p className="text-xs -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <form onSubmit={submitHandler}>
            <input
              value={otp}
              onChange={(e) => {
                setopt(e.target.value);
              }}
              className="bg-[#eee] px-10 py-2 text-base rounded-lg w-full mb-10 font-mono"
              type="number"
              placeholder="Enter OTP "
            />
            <button className="flex justify-center w-full bg-green-600 text-white font-semibold p-2 rounded-lg">
              Confirm
            </button>
            <button
              onClick={() => {
                props.setCofirmRidePopUpPanel(false);
                props.setRidePopupPanel(false);
              }}
              className="w-full bg-red-600 text-gray-700 font-semibold p-2 mt-2 rounded-lg"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CofirmRidePopUp;
