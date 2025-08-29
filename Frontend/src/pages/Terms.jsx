import  { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

function Terms() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const [activeSection, setActiveSection] = useState('user');
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
    user: {
      title: "Rider Terms",
      content: [
        {
          heading: "Account Registration",
          text: "You must be at least 18 years old to create an account and use our services. You agree to provide accurate, current, and complete information during registration and to keep your account information updated."
        },
        {
          heading: "Ride Booking",
          text: "When booking a ride, you agree to provide accurate pickup and destination locations. You must be ready at the pickup location within 5 minutes of the driver's arrival. Cancellation fees may apply for late cancellations."
        },
        {
          heading: "Payment Terms",
          text: "All rides must be paid for through the app using approved payment methods. You agree to pay all applicable fees including base fare, distance charges, time charges, and any applicable taxes or tolls."
        },
        {
          heading: "Conduct Requirements",
          text: "You must treat drivers and other passengers with respect. Prohibited behaviors include harassment, violence, discrimination, or any illegal activities during rides."
        },
        {
          heading: "Liability Limitations",
          text: "Rapido is not liable for personal belongings left in vehicles. Maximum liability for ride-related issues is limited to the cost of the ride."
        }
      ]
    },
    captain: {
      title: "Captain Terms",
      content: [
        {
          heading: "Driver Requirements",
          text: "Captains must be at least 21 years old with a valid driver's license, vehicle registration, and insurance. Background checks and vehicle inspections are mandatory before approval."
        },
        {
          heading: "Vehicle Standards",
          text: "All vehicles must meet safety and comfort standards as specified by local regulations. Regular maintenance and cleanliness are required. Vehicles must display proper identification."
        },
        {
          heading: "Service Standards",
          text: "Captains must provide safe, courteous service. This includes following traffic laws, maintaining professional conduct, and ensuring passenger safety at all times."
        },
        {
          heading: "Payment and Commission",
          text: "Captains receive payment through the app after Rapido deducts its commission. Payment is processed weekly. Captains are responsible for reporting income for tax purposes."
        },
        {
          heading: "Deactivation Policy",
          text: "Accounts may be deactivated for safety violations, poor ratings, fraudulent activity, or violation of terms. Captains can appeal deactivation decisions through the support team."
        }
      ]
    },
    platform: {
      title: "Platform Terms",
      content: [
        {
          heading: "Service Availability",
          text: "Rapido services are provided on an 'as available' basis. We reserve the right to modify, suspend, or discontinue services at any time without prior notice."
        },
        {
          heading: "Intellectual Property",
          text: "All content, trademarks, and data on the Rapido platform are owned by Rapido Technologies. You may not use, copy, or distribute any content without written permission."
        },
        {
          heading: "User Content",
          text: "By using our services, you grant Rapido a non-exclusive, worldwide license to use any content you provide for the purpose of providing and improving our services."
        },
        {
          heading: "Dispute Resolution",
          text: "Any disputes arising from these terms will be resolved through binding arbitration. The governing law is that of the jurisdiction where the service is provided."
        },
        {
          heading: "Termination",
          text: "We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users or the platform."
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
            Terms & Conditions
          </h1>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Legal agreements for using Rapido services
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
          <p>For questions, contact: legal@rapido.com</p>
        </div>
      </div>
    </div>
  );
}

export default Terms;