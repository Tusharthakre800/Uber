import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import gsap from "gsap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const formContainerRef = useRef(null);
  const logoRef = useRef(null);
  const formRef = useRef(null);
  const paraRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
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

    const button = formRef.current.querySelector("button[type='submit']");
    if (button) {
      button.addEventListener("mouseenter", () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      });
      button.addEventListener("mouseleave", () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      });
    }

    const inputs = formRef.current.querySelectorAll("input");
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

    gsap.from(formContainerRef.current, {
      opacity: 0,
      // scale: 0.9,
      duration: 1.2,
      ease: "power3.out",
    });

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      
      gsap.to(formContainerRef.current, {
        x: x * 0.1,
        y: y * 0.1,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "";
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!firstName || !lastName || !email || !password) {
      toast.error("Please fill all the fields", {
        style: { backgroundColor: "#fee2e2", color: "#991b1b" },
        progressStyle: { backgroundColor: "#ef4444" },
      });
      setIsLoading(false);
      return;
    }

    if (firstName.length < 3) {
      toast.error("First name should be at least 3 characters", {
        style: { backgroundColor: "#fee2e2", color: "#991b1b" },
        progressStyle: { backgroundColor: "#ef4444" },
      });
      setIsLoading(false);
      return;
    }

    if (lastName.length < 3) {
      toast.error("Last name should be at least 3 characters", {
        style: { backgroundColor: "#fee2e2", color: "#991b1b" },
        progressStyle: { backgroundColor: "#ef4444" },
      });
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address", {
        style: { backgroundColor: "#fee2e2", color: "#991b1b" },
        progressStyle: { backgroundColor: "#ef4444" },
      });
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters", {
        style: { backgroundColor: "#fee2e2", color: "#991b1b" },
        progressStyle: { backgroundColor: "#ef4444" },
      });
      setIsLoading(false);
      return;
    }

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        toast.success("Account created successfully!", {
          style: { backgroundColor: "#dcfce7", color: "#166534" },
          progressStyle: { backgroundColor: "#22c55e" },
        });
        navigate("/home");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed";
      toast.error(errorMessage, {
        style: { backgroundColor: "#fee2e2", color: "#991b1b" },
        progressStyle: { backgroundColor: "#ef4444" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={formContainerRef}
      className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50"
      }`}
    >
      <div
        className={`absolute inset-0 opacity-20 ${
          isDarkMode
            ? "bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
            : "bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%236D28D9\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
        }`}
      />
      
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

     

      <div
        className={`relative w-full max-w-md rounded-3xl p-8 shadow-2xl backdrop-blur-xl border transition-all duration-500 ${
          isDarkMode
            ? "bg-gray-800/40 border-gray-700/50"
            : "bg-white/60 border-white/20 backdrop-blur-lg"
        }`}
      >
        <div className="text-center mb-8 relative">
          <div className="relative inline-block">
            <img
              ref={logoRef}
              className={`w-20 mx-auto mb-4 transition-all duration-300 hover:scale-110 ${
                isDarkMode ? "invert brightness-200" : ""
              }`}
              src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
              alt="Logo"
            />
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className={`absolute -top-1 -right-32 p-3 ml-5 rounded-full transition-all duration-300  ${ 
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
          </div>
          <h1 className={`text-3xl font-bold mb-2 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}>
            Create Your Account
          </h1>
          <p className={`text-sm ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            Join us and start your journey today
          </p>
        </div>

        <form ref={formRef} onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}>
              Full Name
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  isDarkMode
                    ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white/80 border-gray-300 text-gray-800 placeholder-gray-500"
                }`}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  isDarkMode
                    ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white/80 border-gray-300 text-gray-800 placeholder-gray-500"
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                isDarkMode
                  ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white/80 border-gray-300 text-gray-800 placeholder-gray-500"
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}>
              Password
            </label>
            <div className="relative">
              <input
                type={isPasswordVisible ? "password" : "text"}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 pr-12 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  isDarkMode
                    ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white/80 border-gray-300 text-gray-800 placeholder-gray-500"
                }`}
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

         <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white px-2 py-2 rounded-2xl "
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                creating account...
              </div>
            ) : (
              'create account'
            )}
          </button>
        </form>

        <div ref={paraRef} className="mt-6 text-center">
          <p className={`text-sm ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            Already have an account?{" "}
            <Link
              to="/userLogin"
              className={`font-semibold transition-colors duration-200 ${
                isDarkMode
                  ? "text-purple-400 hover:text-purple-300"
                  : "text-purple-600 hover:text-purple-700"
              }`}
            >
              Sign in here
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className={`text-xs ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}>
            By creating an account, you agree to our{" "}
           
            <Link
              to="/policy"
              className="underline cursor-pointer hover:text-purple-500"
            >
              Usage Policy
            </Link>
            {" "}and{" "}
            <Link
              to="/terms"
              className="underline cursor-pointer hover:text-purple-500"
            >
              Terms & Conditions
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserSignup;
