import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QRCode from "react-qr-code";

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const ride = location.state?.ride || {};
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [showQR, setShowQR] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    useEffect(() => {
        document.body.className = isDarkMode ? "dark-mode" : "";
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    const UPIID = `${import.meta.env.VITE_UPI_ID}`;

    const handlePayment = (e) => {
        e.preventDefault();
        if (!cardNumber || !expiryDate || !cvv) {
            toast.error("Please fill in all fields");
            return;
        }
        if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber)) {
            toast.error("Invalid card number");
            return;
        }
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            toast.error("Invalid expiry date");
            return;
        }
        if (!/^\d{3}$/.test(cvv)) {
            toast.error("Invalid CVV");
            return;
        }
        // Add further validation if needed
        toast.success("Payment successful");
        setTimeout(() => {
            navigate('/home');
        }, 2000); // Redirect after 2 seconds
    };

    const handleQRPayment = () => {
        setShowQR(true);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        toast.info("Scan the QR code to complete the payment");
    };

    const closeQRModal = () => {
        setShowQR(false);
        document.body.style.overflow = 'auto'; // Restore background scrolling
    };

    const formatCardNumber = (value) => {
        return value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
    };

    const formatExpiryDate = (value) => {
        return value.replace(/^(\d{2})(\d{2})$/, '$1/$2');
    };

    return (
        <div className={`h-full p-4 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
            <div className="flex justify-between items-center mb-4">
                <Link to={"/home"}>
                    <div className={ `h-10 w-10  ${isDarkMode ? "bg-gray-800" : "bg-white"} flex items-center  justify-center rounded-full shadow-lg`}>
                        <i className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-gray-800"} ri-home-4-line`}></i>
                    </div>
                </Link>
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
            </div>
            <div className="flex flex-col gap-6 items-center justify-center h-full">
                <h2 className="text-3xl font-semibold">Payment Details</h2>
                <div className={`w-full max-w-md p-6 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border"} rounded-lg shadow-lg`}>
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-lg font-medium">Amount:</span>
                        <span className="text-2xl font-semibold">₹{ride?.fare}</span>
                    </div>
                    <div className={`mb-6 p-2 ${isDarkMode ? "bg-gradient-to-r from-gray-700 to-gray-800" : "bg-gradient-to-r from-gray-200 to-gray-300"} rounded-lg shadow-md`}>
                        <div className="text-lg font-medium mb-2 flex items-center">
                            <i className="ri-bank-card-line mr-2"></i>
                            Card Preview
                        </div>
                        <div className={`bg-gradient-to-r ${isDarkMode ? "from-blue-800 to-purple-900" : "from-blue-500 to-purple-600"} p-6 rounded-lg shadow-lg text-white relative overflow-hidden`}>
                            <div className="absolute top-4 right-4">
                                <i className="ri-visa-line text-2xl opacity-50"></i>
                            </div>
                            <div className="mb-8">
                                <div className="text-xs mb-1 opacity-80">Card Number</div>
                                <div className="text-xl font-semibold tracking-wider">{cardNumber || "1234 5678 9012 3456"}</div>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="text-xs mb-1 opacity-80">Expiry Date</div>
                                    <div className="font-medium">{expiryDate || "MM/YY"}</div>
                                </div>
                                <div>
                                    <div className="text-xs mb-1 opacity-80">CVV</div>
                                    <div className="font-medium">{cvv || "CVV"}</div>
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/10 to-transparent"></div>
                        </div>
                    </div>
                    <form onSubmit={handlePayment}>
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">Card Number</label>
                            <input 
                                type="text" 
                                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${isDarkMode ? "bg-gray-700 border-gray-600 focus:ring-green-600" : "focus:ring-green-600"}`} 
                                placeholder="1234 5678 9012 3456" 
                                value={cardNumber}
                                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                maxLength="19"
                            />
                        </div>
                        <div className="flex justify-between mb-6">
                            <div className="w-1/2 mr-2">
                                <label className="block text-sm font-medium mb-2">Expiry Date</label>
                                <input 
                                    type="text" 
                                    className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${isDarkMode ? "bg-gray-700 border-gray-600 focus:ring-green-600" : "focus:ring-green-600"}`} 
                                    placeholder="MM/YY" 
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                                    maxLength="5"
                                />
                            </div>
                            <div className="w-1/2 ml-2">
                                <label className="block text-sm font-medium mb-2">CVV</label>
                                <input 
                                    type="text"    
                                    className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${isDarkMode ? "bg-gray-700 border-gray-600 focus:ring-green-600" : "focus:ring-green-600"}`} 
                                    placeholder="123" 
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    maxLength="3"
                                />
                            </div>
                        </div>
                        <button 
                            type="submit"
                            className={`w-full p-3 ${isDarkMode ? "bg-green-700" : "bg-green-600"} text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 mb-4`}
                        >
                            Pay Now
                        </button>
                        <button 
                            type="button"
                            className={`w-full p-3 ${isDarkMode ? "bg-blue-700" : "bg-blue-600"} text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300`}
                            onClick={handleQRPayment}
                        >
                            Pay with QR Code
                        </button>
                        {showQR && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className={`p-10 rounded-lg shadow-lg relative ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                                    <button 
                                        className={`absolute top-2 right-2 ${isDarkMode ? "text-gray-300 hover:text-gray-100" : "text-gray-600 hover:text-gray-800"}`}
                                        onClick={closeQRModal}
                                    >
                                        <i className="ri-close-line text-2xl"></i>
                                    </button>
                                    <QRCode 
                                        value={`upi://pay?pa=${UPIID}&pn=Merchant&am=${ride?.fare}&cu=INR&tn=Ride Payment`}
                                        bgColor={isDarkMode ? "#1F2937" : "#FFFFFF"}
                                        fgColor={isDarkMode ? "#FFFFFF" : "#000000"}
                                    />
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Payment;
