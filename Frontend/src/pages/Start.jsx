import { NavLink } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FiArrowRight, FiSun, FiMoon } from "react-icons/fi"

function Start() {
  const buttonRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setIsDarkMode(JSON.parse(savedMode));
    }

    // Logo animation
    gsap.fromTo(logoRef.current, 
      { scale: 0.8, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" }
    );

    // Title animation
    gsap.fromTo(titleRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" }
    );

    // Button floating animation
    gsap.fromTo(buttonRef.current, 
      { y: -10, scale: 0.95 }, 
      { y: 10, scale: 1.05, repeat: -1, yoyo: true, duration: 2, ease: "power2.inOut" }
    );

    // Floating background elements
    gsap.to(".floating-1", { y: 20, duration: 4, repeat: -1, yoyo: true, ease: "power1.inOut" });
    gsap.to(".floating-2", { y: -20, duration: 3, repeat: -1, yoyo: true, ease: "power1.inOut" });
    gsap.to(".floating-3", { y: 15, duration: 5, repeat: -1, yoyo: true, ease: "power1.inOut" });

  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`floating-1 absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
          isDarkMode ? 'bg-purple-600' : 'bg-blue-400'
        }`}></div>
        <div className={`floating-2 absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
          isDarkMode ? 'bg-indigo-600' : 'bg-purple-400'
        }`}></div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleDarkMode}
          className={`backdrop-blur-lg rounded-full p-3 transition-all duration-300 hover:scale-110 ${
            isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
              : 'bg-white/80 hover:bg-white text-gray-700'
          } backdrop-blur-sm`}
        >
          {isDarkMode ? (
            <FiSun className="w-5 h-5" />
          ) : (
            <FiMoon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div 
              ref={logoRef}
              className={`inline-block backdrop-blur-xl rounded-3xl p-8 mb-6 transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800/60 border-gray-700/50' 
                  : 'bg-white/60 border-white/20'
              } backdrop-filter backdrop-blur-lg border`}
            >
              <img 
                className={`w-20 h-20 mx-auto transition-all duration-300 ${
                  isDarkMode ? 'invert brightness-200' : ''
                }`} 
                src="https://www.svgrepo.com/show/505031/uber-driver.svg" 
                alt="Uber Logo" 
              />
            </div>
            
            <h1 
              ref={titleRef}
              className={`text-4xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Welcome to <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Uber</span>
            </h1>
            
            <p className={`text-lg ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Your journey starts here
            </p>
          </div>

          {/* Action Cards */}
          <div className="space-y-4">
            {/* User Card */}
            <NavLink 
              to="/userlogin"
              className={`group block backdrop-blur-xl rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                isDarkMode 
                  ? 'bg-gray-800/60 border-gray-700/50 hover:bg-gray-700/60' 
                  : 'bg-white/60 border-white/20 hover:bg-white/80'
              } border backdrop-filter backdrop-blur-lg`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-xl font-semibold mb-1 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Ride with us</h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Book rides instantly</p>
                </div>
                <FiArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-700'
                }`} />
              </div>
            </NavLink>

            {/* Captain Card */}
            <NavLink 
              to="/captainlogin"
              className={`group block backdrop-blur-xl rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                isDarkMode 
                  ? 'bg-gray-800/60 border-gray-700/50 hover:bg-gray-700/60' 
                  : 'bg-white/60 border-white/20 hover:bg-white/80'
              } border backdrop-filter backdrop-blur-lg`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-xl font-semibold mb-1 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Drive with us</h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Start earning today</p>
                </div>
                <FiArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-700'
                }`} />
              </div>
            </NavLink>
          </div>

          {/* Continue Button */}
          <div className="mt-8 text-center">
            <NavLink 
              ref={buttonRef}
              to="/userlogin" 
              className={`inline-flex items-center justify-center px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600' 
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
              }`}
            >
              Get Started
              <FiArrowRight className="ml-2 w-5 h-5" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Start
