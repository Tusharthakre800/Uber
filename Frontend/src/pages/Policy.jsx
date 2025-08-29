import  { useState, useEffect , useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

function Policy() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const [activeSection, setActiveSection] = useState('privacy');
  const contentRef = useRef(null);
  const tabsRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(contentRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    if (tabsRef.current) {
      tl.from(tabsRef.current.children, {
        x: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.5");
    }
  }, [activeSection]);

  const sections = {
    privacy: {
      title: "Privacy Policy",
      content: [
        {
          heading: "Information We Collect",
          text: "We collect information you provide directly to us, such as when you create an account, request a ride, contact customer support, or otherwise interact with our services. This includes your name, email address, phone number, payment information, and any other information you choose to provide."
        },
        {
          heading: "How We Use Your Information",
          text: "We use the information we collect to provide, maintain, and improve our services, including to process transactions, send you technical notices and support messages, communicate with you about products and services, and monitor and analyze trends and usage."
        },
        {
          heading: "Information Sharing",
          text: "We do not share personal information with companies, organizations, or individuals outside of Rapido except in specific circumstances such as with your consent, for legal reasons, or with service providers who process data on our behalf."
        },
        {
          heading: "Data Security",
          text: "We implement appropriate technical and organizational measures to protect the security of your personal information against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access."
        }
      ]
    },
    terms: {
      title: "Terms of Service",
      content: [
        {
          heading: "Acceptance of Terms",
          text: "By accessing and using the Rapido platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service."
        },
        {
          heading: "Use License",
          text: "Permission is granted to temporarily download one copy of the materials on Rapido's platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title."
        },
        {
          heading: "User Responsibilities",
          text: "You agree not to use the platform for any unlawful purpose or in any way that could damage, disable, overburden, or impair the service. You are responsible for maintaining the confidentiality of your account credentials."
        },
        {
          heading: "Limitation of Liability",
          text: "In no event shall Rapido or its suppliers be liable for any damages arising out of the use or inability to use the materials on Rapido's platform."
        }
      ]
    },
    data: {
      title: "Data Usage",
      content: [
        {
          heading: "Data Retention",
          text: "We retain your personal information for as long as necessary to provide you with our services, comply with our legal obligations, resolve disputes, and enforce our agreements."
        },
        {
          heading: "Your Rights",
          text: "You have the right to access, update, or delete your personal information. You can do this through your account settings or by contacting us directly."
        },
        {
          heading: "Location Data",
          text: "We collect location data to provide ride-matching services. You can control location sharing through your device settings, but this may affect the functionality of our services."
        },
        {
          heading: "Third-Party Services",
          text: "Our services may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third-party services."
        }
      ]
    }
  };

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50'
    }`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Legal & Policies
          </h1>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Understanding how we protect your data and provide our services
          </p>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-lg transition-colors ${
              isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
                : 'bg-white hover:bg-gray-100 text-gray-700 shadow-lg'
            }`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div ref={tabsRef} className="flex space-x-1 p-1 rounded-lg backdrop-blur-sm bg-white/20 dark:bg-gray-800/20">
            {Object.entries(sections).map(([key, section]) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeSection === key
                    ? isDarkMode
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-purple-500 text-white shadow-lg'
                    : isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className={`backdrop-blur-lg rounded-2xl p-8 shadow-2xl ${
            isDarkMode
              ? 'bg-gray-800/60 border border-gray-700/50'
              : 'bg-white/60 border border-white/20'
          }`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {sections[activeSection].title}
          </h2>
          
          <div className="space-y-6">
            {sections[activeSection].content.map((item, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-6 last:pb-0">
                <h3 className={`text-lg font-semibold mb-3 ${
                  isDarkMode ? 'text-purple-400' : 'text-purple-600'
                }`}>
                  {item.heading}
                </h3>
                <p className={`leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              isDarkMode
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
          >
            Back to Home
          </Link>
        </div>

        <div className={`text-center mt-4 text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>For questions, contact: support@rapido.com</p>
        </div>
      </div>
    </div>
  );
}

export default Policy;