const axios = require('axios');
const queryString = require('query-string');

module.exports = async function (req, res, next) {
	// verify grecaptcha token

	try {
		const config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		};

		const body = queryString.stringify({
			secret: process.env.GRECAPTCHASECRETKEY,
			response: req.body.grecaptchaToken
		});

		const gRes = await axios.post(
			'https://www.google.com/recaptcha/api/siteverify',
			body,
			config
		);
		if (!gRes.data.success) {
			throw new Error(gRes.data['error-codes'].join(', '));
		}
		next();
	} catch (err) {
		res.status(400).json({
			error: {
				msg: err.message
			}
		});
	}
};
