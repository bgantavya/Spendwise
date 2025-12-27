import './App.css';
import { useEffect, useState } from 'react';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import { fetchAuthStatus } from './api';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [checking, setChecking] = useState(true);

	useEffect(() => {
		async function check() {
			try {
				await fetchAuthStatus();
				setIsAuthenticated(true);
			} catch {
				setIsAuthenticated(false);
			} finally {
				setChecking(false);
			}
		}
		check();
	}, [isAuthenticated]);

	if (checking) return <div className="p-8 text-gray-600">Loading...</div>;

	return (
		<div>
			{isAuthenticated ? (
				<Dashboard onLogout={() => setIsAuthenticated(false) } />
			) : (
				<AuthModal onAuthenticated={() => setIsAuthenticated(true)} />
			)}
		</div>
	);
}

export default App;
