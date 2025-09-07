import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { FaHome, FaArrowLeft, FaCar } from 'react-icons/fa';
import "../App.css"

const NotFound = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const carRef = useRef(null);
  const text404Ref = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial fade in with stagger
    tl.from(containerRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    })
    .from(text404Ref.current, {
      scale: 0,
      rotation: 180,
      opacity: 0,
      duration: 1.2,
      ease: "back.out(1.7)"
    })
    .from(carRef.current, {
      x: -300,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.8")
    .from(subtitleRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
  

    // Car floating animation
    gsap.to(carRef.current, {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // 404 text glow effect
    gsap.to(text404Ref.current, {
      textShadow: "0 0 20px rgba(255,255,255,0.5)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Mouse move parallax effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 20;
      const yPos = (clientY / innerHeight - 0.5) * 20;

      gsap.to(carRef.current, {
        x: xPos,
        y: yPos - 20, // -20 to account for floating animation
        duration: 0.5,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      <div className="relative min-h-screen flex items-center justify-center px-4">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        <div ref={containerRef} className="text-center z-10">
          {/* 404 Text */}
          <h1 
            ref={text404Ref} 
            className="text-9xl md:text-[200px] font-black text-white mb-4"
            style={{
              background: 'linear-gradient(45deg, #fff, #ccc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            404
          </h1>

          {/* Animated Car */}
          <div ref={carRef} className="inline-block mb-8">
            <FaCar className="text-6xl text-white drop-shadow-lg" />
          </div>

          {/* Content */}
          <div ref={subtitleRef} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Lost Your Way?
            </h2>
            <p className="text-gray-300 text-lg max-w-md mx-auto">
              Don't worry, even the best drivers take a wrong turn sometimes. 
              Let's get you back on the right route!
            </p>
          </div>

          {/* Additional Links */}
          <div className="mt-12">
            <p className="text-gray-400 mb-4">Popular destinations:</p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link 
                to="/userlogin" 
                className="text-blue-400 hover:text-blue-300 transition-colors duration-300 hover:underline"
              >
                Sign In
              </Link>
              <Link 
                to="/captainlogin" 
                className="text-blue-400 hover:text-blue-300 transition-colors duration-300 hover:underline"
              >
                Become a Driver
              </Link>
            </div>
          </div>
        </div>

        {/* Road Lines Animation */}
        <div className="absolute bottom-0 left-0 w-full h-20 overflow-hidden">
          <div className="absolute bottom-10 w-full h-1 bg-gray-600">
            <div className="absolute top-0 left-0 w-20 h-1 bg-white animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;