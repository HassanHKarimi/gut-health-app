import React, { useState } from 'react';
// We'll use simple CSS transitions instead of framer-motion
// import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AuthCard = () => {
  const [activeTab, setActiveTab] = useState('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (activeTab === 'signup') {
        // Signup validation
        if (!name || !email || !password || !confirmPassword) {
          setError('Please fill in all fields');
          setLoading(false);
          return;
        }
        
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        
        if (password.length < 8) {
          setError('Password must be at least 8 characters');
          setLoading(false);
          return;
        }
        
        // Create user in database
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
        await register(name, email, password);
        navigate('/home');
      } else {
        // Login validation
        if (!email || !password) {
          setError('Please fill in all fields');
          setLoading(false);
          return;
        }
        
        // Login user
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
        await login(email, password);
        navigate('/home');
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError(activeTab === 'login' ? 'Invalid email or password' : 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-teal-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out p-8"
      >
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-green-700 mb-1">
            Gut Health App
          </h2>
          <p className="text-lg text-gray-600 font-medium">
            {activeTab === 'signup' ? 'Create your account to get started' : 'Welcome back!'}
          </p>
        </div>
        
        <div className="flex mb-6 bg-gray-100 rounded-md p-1">
          <button
            className={`flex-1 py-3 px-6 text-center font-medium text-sm rounded-md transition-all ${
              activeTab === 'signup' 
                ? 'bg-white shadow-md text-green-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('signup')}
          >
            SIGN UP
          </button>
          <button
            className={`flex-1 py-3 px-6 text-center font-medium text-sm rounded-md transition-all ${
              activeTab === 'login' 
                ? 'bg-white shadow-md text-green-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('login')}
          >
            LOGIN
          </button>
        </div>
        
        {error && (
          <div className="mb-6 bg-red-50 rounded-lg border border-red-200 p-4 text-sm text-red-700" role="alert">
            <p>{error}</p>
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          {activeTab === 'signup' && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none block w-full px-4 py-3.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                            bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}
          
          <div>
            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <div className="relative">
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-4 py-3.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                          bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete={activeTab === 'signup' ? "new-password" : "current-password"}
                required
                className="appearance-none block w-full px-4 py-3.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                          bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 pr-12 sm:text-sm"
                placeholder={activeTab === 'signup' ? "Create password (8+ characters)" : "Your password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {activeTab === 'signup' && password && (
              <div className="mt-3">
                <div className="flex items-center">
                  <div className={`h-1.5 flex-1 rounded-full ${password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className="w-2"></div>
                  <div className={`h-1.5 flex-1 rounded-full ${/[A-Z]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className="w-2"></div>
                  <div className={`h-1.5 flex-1 rounded-full ${/[0-9]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                </div>
                <div className="mt-2 text-xs text-gray-600 flex justify-between">
                  <span className={password.length >= 8 ? "text-green-500 font-medium" : "text-gray-500"}>8+ characters</span>
                  <span className={/[A-Z]/.test(password) ? "text-green-500 font-medium" : "text-gray-500"}>Uppercase</span>
                  <span className={/[0-9]/.test(password) ? "text-green-500 font-medium" : "text-gray-500"}>Number</span>
                </div>
              </div>
            )}
          </div>
          
          {activeTab === 'signup' && (
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-4 py-3.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                            bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {password && confirmPassword && (
                <p className={`mt-2 text-xs font-medium ${password === confirmPassword ? 'text-green-500' : 'text-red-500'}`}>
                  {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                </p>
              )}
            </div>
          )}
          
          {activeTab === 'login' && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-green-600 hover:text-green-700 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150 ease-in-out shadow-sm`}
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {activeTab === 'signup' ? 'Create Account' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="mt-6 py-4 text-center">
          <p className="text-xs text-gray-500">
            By {activeTab === 'signup' ? 'signing up' : 'signing in'}, you agree to our{' '}
            <a href="#" className="font-medium text-green-600 hover:text-green-700 transition-colors">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium text-green-600 hover:text-green-700 transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;