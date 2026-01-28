
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/forgot_password', { email });
    setSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-3xl shadow-2xl">
          {!submitted ? (
            <>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Forgot Password?</h2>
              <p className="text-slate-500 mb-8">Enter your email and we'll send you a link to reset your password.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg"
                >
                  Send Reset Link
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Check your email</h2>
              <p className="text-slate-500 mb-8">We've sent password reset instructions to <strong>{email}</strong>.</p>
              <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-500">
                Back to Login
              </Link>
            </div>
          )}
          
          <div className="mt-8 text-center">
            <Link to="/login" className="text-sm text-slate-500 hover:text-slate-800">
              &larr; Remembered? Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
