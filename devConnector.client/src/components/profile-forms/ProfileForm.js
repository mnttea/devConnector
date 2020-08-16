// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { createProfile, getCurrentProfile } from '../../actions/profile';

// const initialState = {
// 	company: '',
// 	website: '',
// 	location: '',
// 	status: '',
// 	skills: '',
// 	githubusername: '',
// 	bio: '',
// 	twitter: '',
// 	facebook: '',
// 	linkedin: '',
// 	youtube: '',
// 	instagram: ''
// };

// const ProfileForm = ({
// 	profile: { profile, loading },
// 	createProfile,
// 	getCurrentProfile,
// 	history
// }) => {
// 	const [formData, setFormData] = useState(initialState);
// 	const [displaySocialInputs, toggleSocialInputs] = useState(false);

// 	useEffect(() => {
// 		if (!profile) getCurrentProfile();
// 		if (!loading && profile) {
// 			const profileData = { ...initialState };

// 			for (const key in profile) {
// 				if (key in profileData) profileData[key] = profile[key];
// 			}
// 			for (const key in profile.social) {
// 				if (key in profileData) profileData[key] = profile.social[key];
// 			}
// 			if (Array.isArray(profileData.skills))
// 				profileData.skills = profileData.skills.join(', ');
// 			setFormData(profileData);
// 		}
// 	}, [loading, getCurrentProfile, profile]);

// 	const {
// 		company,
// 		website,
// 		location,
// 		status,
// 		skills,
// 		githubusername,
// 		bio,
// 		twitter,
// 		facebook,
// 		linkedin,
// 		youtube,
// 		instagram
// 	} = formData;

//     const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

// 	return <div></div>;
// };

// ProfileForm.propTypes = {
// 	createProfile: PropTypes.func.isRequired,
// 	getCurrentProfile: PropTypes.func.isRequired,
// 	profile: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
// 	profile: state.profile
// });

// export default connect(mapStateToProps, { createProfile, getCurrentProfile })(ProfileForm);
