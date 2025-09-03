import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const UserForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/forgot-password`, { email });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl bg-white/60 backdrop-blur-xl">
                <h1 className="text-3xl font-bold mb-6 text-center">Forgot Password</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-black text-white py-3 rounded-2xl"
                    >
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
                <p className="text-center mt-4">
                    <Link to="/userLogin" className="text-blue-600 hover:text-blue-500">
                        Back to Login
                    </Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UserForgotPassword;