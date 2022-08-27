import './index.css';
import { Web3Provider } from './contexts/Web3Provider';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Web3Provider>
			<App />
		</Web3Provider>
	</React.StrictMode>
);
