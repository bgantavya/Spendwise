import { useState } from 'react';
import { login, register, setToken } from '../api';

export default function AuthModal({ onAuthenticated }) {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    // Form Fields
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const validateForm = () => {
        const newErrors = {};
        if (!username) newErrors.username = 'Username is required';
        if (!password) newErrors.password = 'Password is required';
        if (!isLoginMode) {
            if (!email) newErrors.email = 'Email is required';
            else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
            if (!firstName) newErrors.firstName = 'First name is required';
            if (!lastName) newErrors.lastName = 'Last name is required';
            if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            if (isLoginMode) {
                const data = await login(username, password);
                if (data?.token) {
                    setToken(data.token);
                    onAuthenticated();
                } else {
                    setMessage(data?.message || 'Login failed.');
                }
            } else {
                // Pass all new fields to the register function
                await register(username, password, email, firstName, lastName);
                setMessage('Registration successful! Please login.');
                setIsLoginMode(true);
                // Optional: clear registration specific fields
                setFirstName('');
                setLastName('');
                setEmail('');
            }
        } catch (err) {
            setMessage(err.message || 'Server error.');
        } finally {
            setLoading(false);
        }
    }

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
        setMessage('');
    };

    // Reusable input style class (assuming 'input-field' is defined in your global CSS, 
    // otherwise replace with: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
    const inputClassName = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    {isLoginMode ? 'Welcome Back' : 'Create Account'}
                </h2>
                
                {message && (
                    <div className={`mb-4 p-3 rounded text-sm ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLoginMode && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    className={inputClassName}
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    required={!isLoginMode}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    className={inputClassName}
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {!isLoginMode && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                className={inputClassName}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required={!isLoginMode}
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            className={inputClassName}
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className={inputClassName}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (isLoginMode ? 'Sign In' : 'Create Account')}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    {isLoginMode ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <button
                        onClick={toggleMode}
                        className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none underline decoration-transparent hover:decoration-blue-600 transition-all"
                    >
                        {isLoginMode ? 'Register now' : 'Log in'}
                    </button>
                </div>
            </div>
        </div>
    );
}