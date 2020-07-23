import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Routes from '../components/routing/Routes';

// redux
import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';
import setAuthToken from '../utils/setAuthToken';

import '../css/App.css';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	// similar to component did mount
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<>
					<Navbar />
					<Route component={Routes} />
				</>
			</Router>
		</Provider>
	);
};

export default App;
