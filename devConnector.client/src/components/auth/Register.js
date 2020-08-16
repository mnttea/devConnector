import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

// parameters in Register are this.props deconstructed
const Register = ({ setAlert, register, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});
	const { name, email, password, password2 } = formData;

	useEffect(() => {
		//TODO: document this later
		window.onloadCallback = () => {
			window.grecaptcha.render('grecaptcha', {
				sitekey: '6LfbrbwZAAAAAFc3enaOhlTYyl8OaxgOdzGW5YFZ'
			});
		};

		const script = document.createElement('script');
		script.src =
			'https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit';
		script.async = true;
		script.defer = true;
		document.body.appendChild(script);
	}, []);

	const onChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const onSubmit = async e => {
		e.preventDefault();
		if (password !== password2) {
			setAlert('Passwords do not match', 'danger', 3000);
		} else {
			register({
				name,
				email,
				password,
				grecaptchaToken: window.grecaptcha.getResponse()
			});
		}
	};

	// redirect is registered
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<>
			<h1 className='large text-primary'>Sign Up</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Create Your Account
			</p>
			<form className='form' onSubmit={e => onSubmit(e)}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Name'
						name='name'
						value={name}
						onChange={e => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>
						This site uses Gravatar so if you want a profile image, use a Gravatar
						email
					</small>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						value={password}
						onChange={e => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Confirm Password'
						name='password2'
						value={password2}
						onChange={e => onChange(e)}
					/>
				</div>
				<div id='grecaptcha'></div>
				<input type='submit' className='btn btn-primary' value='Register' />
			</form>
			<p className='my-1'>
				Already have an account? <Link to='/login'>Sign In</Link>
			</p>
		</>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
