import { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { useGoogleLogin } from "@react-oauth/google"; // Updated import
import gsap from "gsap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  // Google Login Hook
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    redirect_uri: import.meta.env.NODE_ENV === 'production' 
      ? 'https://uber-v29m.onrender.com/users/google-login'
      : 'http://localhost:3000/users/google-login',
    ux_mode: 'popup',
    onSuccess: async (codeResponse) => {
      try {
        setIsLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/google-login`,
          { credential: codeResponse.code }
        );

        if (response.status === 200) {
          const { user, token } = response.data;
          setUser(user);
          localStorage.setItem("token", token);
          
          toast.success("Welcome back!", {
            style: {
              backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
              color: isDarkMode ? "#ffffff" : "#000000",
            }
          });
          
          setTimeout(() => navigate("/home"), 1000);
        }
      } catch (error) {
        const message = error.response?.data?.message || "Google login failed";
        setError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error('Google login error:', error);
      toast.error("Google login failed. Please try again.");
    }
  });

  // Refs for animations
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const logoRef = useRef(null);
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);  

  useEffect(() => {
    // Enhanced animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.from(cardRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out"
    })
    .from(logoRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.5")
    .from([titleRef.current, subtitleRef.current], {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.2
    }, "-=0.3")
    .from(formRef.current.children, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.1
    }, "-=0.2");

    // Parallax effect on mouse move
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      
      gsap.to(cardRef.current, {
        x: x * 0.1,
        y: y * 0.1,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    document.documentElement.className = isDarkMode ? 'dark' : '';
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validation
    if (!email || !password) {
      setError("Please fill all fields");
      toast.error("Please fill all fields");
      setIsLoading(false);
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      toast.error("Please enter a valid email");
      setIsLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      toast.error("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        { email, password }
      );

      if (response.status === 200) {
        const { user, token } = response.data;
        setUser(user);
        localStorage.setItem("token", token);
        
        toast.success("Welcome back!", {
          style: {
            backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
            color: isDarkMode ? "#ffffff" : "#000000",
          }
        });
        
        setTimeout(() => navigate("/home"), 1000);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

    const googleLoginHandler = async (credentialResponse) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/google-login`,
        { credential: credentialResponse.credential }
      );

      if (response.status === 200) {
        const { user, token } = response.data;
        setUser(user);
        localStorage.setItem("token", token);
        
        toast.success("Welcome back!", {
          style: {
            backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
            color: isDarkMode ? "#ffffff" : "#000000",
          }
        });
        
        setTimeout(() => navigate("/home"), 1000);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Google login failed";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const googleLoginError = () => {
    toast.error("Google login failed. Please try again.");
  };

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen flex items-center justify-center p-4 transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 ${
          isDarkMode ? 'bg-purple-600' : 'bg-blue-400'
        } blur-3xl`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 ${
          isDarkMode ? 'bg-indigo-600' : 'bg-purple-400'
        } blur-3xl`}></div>
      </div>

      <div 
        ref={cardRef}
        className={`relative w-full max-w-md p-8 rounded-3xl shadow-2xl backdrop-blur-xl border transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-800/60 border-gray-700/50' 
            : 'bg-white/60 border-white/20'
        } backdrop-filter backdrop-blur-lg`}
      >
        {/* Dark mode toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
              : 'bg-white/80 hover:bg-white text-gray-700'
          } backdrop-blur-sm`}
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

        {/* Logo and branding */}
        <div className="text-center mb-8">
          <img
            ref={logoRef}
            className={`w-20 mx-auto mb-4 transition-all duration-300 ${
              isDarkMode ? 'invert brightness-200' : ''
            }`}
            src="https://www.svgrepo.com/show/505031/uber-driver.svg"
            alt="Rapido Logo"
          />
          <h1 
            ref={titleRef}
            className={`text-3xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Welcome Back
          </h1>
          <p 
            ref={subtitleRef}
            className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Sign in to continue your journey
          </p>
        </div>

        {/* Login form */}
        <form ref={formRef} onSubmit={submitHandler} className="space-y-4 flex flex-col">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 ${
                isDarkMode 
                  ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-transparent' 
                  : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-purple-500 focus:border-transparent'
              } backdrop-blur-sm`}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Password
            </label>
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 pr-12 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 ${
                  isDarkMode 
                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-transparent' 
                    : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-purple-500 focus:border-transparent'
                } backdrop-blur-sm`}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors ${
                  isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {isPasswordVisible ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m9.879 9.878l4.242 4.242M21 21L9.878 9.878" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

         <div className="text-right mb-4">
             <Link 
                 to="/user-forgot-password" 
                 className={`text-sm ${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'}`}
             >
                 Forgot Password?
             </Link>
         </div>
         
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white px-2 py-2 rounded-2xl "
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Don't have an account?{' '}
            <Link 
              to="/userSignup" 
              className={`font-medium transition-colors ${
                isDarkMode 
                  ? 'text-purple-400 hover:text-purple-300' 
                  : 'text-purple-600 hover:text-purple-500'
              }`}
            >
              Create Account
            </Link>
          </p>
          <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              }`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 ${
                isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'
              }`}>
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <GoogleLoginButton />
          </div>
        </div>
          
          <Link 
            to="/captainLogin"
            className={`inline-flex items-center px-6 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-700/50 text-yellow-400 hover:bg-gray-600/50' 
                : 'bg-white/80 text-yellow-600 hover:bg-white shadow-lg'
            } backdrop-blur-sm`}
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
            </svg>
            Sign in as Captain
          </Link>
        </div>
      </div>
      
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? "dark" : "light"}
      />
    </div>
  );
}

export default UserLogin;