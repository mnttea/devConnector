import axios from 'axios';

const setAuthToken = token => {
	// if passed in is a token, set in global header
	// else delete token from global header
	if (token) {
		axios.defaults.headers.common['x-auth-token'] = token;
	} else {
		delete axios.defaults.headers.common['x-auth-token'];
	}
};

export default setAuthToken;
