/* eslint-disable react/no-unescaped-entities */
import React, {  useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import gsap from "gsap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CaptainSignup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const formContainerRef = useRef(null);
  const logoRef = useRef(null);
  const formRef = useRef(null);
  const paraRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    // Initial animation timeline
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.from(logoRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.3)",
    })
      .from(
        formRef.current.children,
        {
          y: 50,
          opacity: 0,
          stagger: 0.2,
          duration: 1,
        },
        "-=1"
      )
      .from(
        paraRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.6"
      );

    // Add hover effects
    const button = formRef.current.querySelector("button");
    if (button) {
      button.addEventListener("mouseenter", () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      });
      button.addEventListener("mouseleave", () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    }

    // Add input focus animations
    const inputs = formRef.current.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        gsap.to(input, {
          scale: 1.02,
          duration: 0.2,
          ease: "power2.out",
        });
      });
      input.addEventListener("blur", () => {
        gsap.to(input, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      });
    });

    // Logo hover effect
    if (logoRef.current) {
      logoRef.current.addEventListener("mouseenter", () => {
        gsap.to(logoRef.current, {
          rotate: 360,
          duration: 1,
          ease: "power2.out",
        });
      });
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !vehicleColor ||
      !vehiclePlate ||
      !vehicleCapacity ||
      !vehicleType
    ) {
      toast.error("Please fill all the fields", {
        style: {
          backgroundColor: isDarkMode ? "#374151" : "#fee2e2",
          color: isDarkMode ? "#f3f4f6" : "#991b1b",
        },
      });
      setIsLoading(false);
      return;
    }

    const validations = [
      { field: firstName, min: 3, name: "First name" },
      { field: lastName, min: 3, name: "Last name" },
      { field: email, min: 7, name: "Email" },
      { field: password, min: 3, name: "Password" },
      { field: vehicleColor, min: 2, name: "Vehicle color" },
      { field: vehiclePlate, min: 5, name: "Vehicle plate" },
    ];

    for (const validation of validations) {
      if (validation.field.length < validation.min) {
        const errorMsg = `${validation.name} should be at least ${validation.min} characters`;
        setError(errorMsg);
        toast.error(errorMsg, {
          style: {
            backgroundColor: isDarkMode ? "#374151" : "#fee2e2",
            color: isDarkMode ? "#f3f4f6" : "#991b1b",
          },
        });
        setIsLoading(false);
        return;
      }
    }

    if (vehicleCapacity < 1 || vehicleCapacity > 4) {
      const errorMsg = "Vehicle capacity should be between 1 and 4";
      setError(errorMsg);
      toast.error(errorMsg, {
        style: {
          backgroundColor: isDarkMode ? "#374151" : "#fee2e2",
          color: isDarkMode ? "#f3f4f6" : "#991b1b",
        },
      });
      setIsLoading(false);
      return;
    }

    const CaptainData = {
      fullname: { firstname: firstName, lastname: lastName },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        CaptainData
      );

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        toast.success("Registration successful!", {
          style: {
            backgroundColor: isDarkMode ? "#065f46" : "#d1fae5",
            color: isDarkMode ? "#f3f4f6" : "#065f46",
          },
        });
        navigate("/captain-home");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Registration failed";
      setError(errorMsg);
      toast.error(errorMsg, {
        style: {
          backgroundColor: isDarkMode ? "#374151" : "#fee2e2",
          color: isDarkMode ? "#f3f4f6" : "#991b1b",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={formContainerRef}
      className={`relative min-h-screen flex items-center justify-center p-4 overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50"
      }`}
    >
      <ToastContainer position="top-center" />
  
        <div
          className={`relative backdrop-blur-lg rounded-3xl p-8 shadow-2xl ${
            isDarkMode
              ? "bg-gray-800/60 border border-gray-700/50"
              : "bg-white/40 border border-white/20"
          }`}
        >
          <form ref={formRef} onSubmit={submitHandler} className="space-y-6">
            {error && (
              <div className={`p-3 rounded-lg text-sm ${
                isDarkMode
                  ? "bg-red-900/30 text-red-300 border border-red-700/30"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}>
                {error}
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-lg font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}>
                  Captain's Identity
                </h3>
                <button
                  type="button"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded-full transition-colors  ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500"
                  }`}
                  type="text"
                  placeholder="First Name"
                />
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500"
                  }`}
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-3 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}>
                Email Address
              </h3>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode
                    ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500"
                }`}
                type="email"
                placeholder="captain@rapido.com"
              />
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-3 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}>
                Password
              </h3>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 pr-12 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500"
                  }`}
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-xl transition-colors ${
                    isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {isPasswordVisible ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-3 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}>
                Vehicle Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  className={`px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500"
                  }`}
                  type="text"
                  placeholder="Vehicle Color"
                  value={vehicleColor}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^[a-zA-Z\s]+$/.test(value)) {
                      setVehicleColor(value);
                    }
                  }}
                />
                <input
                  className={`px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500"
                  }`}
                  type="text"
                  placeholder="Vehicle Plate"
                  value={vehiclePlate}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 10) {
                      setVehiclePlate(value.toUpperCase());
                    }
                  }}
                  minLength={5}
                  maxLength={10}
                />
                <input
                  className={`px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500"
                  }`}
                  type="number"
                  placeholder="Capacity"
                  value={vehicleCapacity}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || (value >= 1 && value <= 4 && !value.includes('.'))) {
                      setVehicleCapacity(value);
                    }
                  }}
                  min="1"
                  max="4"
                />
                <select
                  className={`px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600 text-white"
                      : "bg-white/50 border-gray-300 text-gray-800"
                  }`}
                  value={vehicleType}
                  onChange={(e) => {
                    const value = e.target.value;
                    setVehicleType(value);
                    if (value === 'motorcycle') {
                      setVehicleCapacity('1');
                    } else if (value === 'car') {
                      setVehicleCapacity('4');
                    } else if (value === 'auto') {
                      setVehicleCapacity('3');
                    }
                  }}
                >
                  <option value="" disabled>Select Type</option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="motorcycle">Motorcycle</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white px-2 py-2 rounded-2xl"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span className="ml-2">Creating Account...</span>
                </div>
              ) : (
                "Create Captain Account"
              )}
            </button>
          </form>

          <p
            ref={paraRef}
            className={`text-center text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Already have an account?{" "}
            <Link
              to="/captainlogin"
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              Sign In
            </Link>
          </p>
        <p className="text-center text-sm text-gray-600">
          By signing up, you agree to our{" "}
          <Link
            to="/terms"
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            Terms of Service
          </Link>{" "}
          
          <Link
            to="/policy"
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            Privacy Policy
          </Link>
        </p>
        </div>
    </div>
  );
}

export default CaptainSignup;
