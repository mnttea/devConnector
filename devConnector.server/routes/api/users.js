const express = require('express');
const router = express.Router();
const grecaptcha = require('../../middleware/grecaptcha');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

// User Model
const User = require('../../models/User');

// @route           GET api/users
// @description     Register user
// @access          Public
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Please enter a password with 6 or more characters').isLength({
			min: 6
		})
	],
	grecaptcha,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			// see if user exists
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({
					errors: { msg: 'User already exists' }
				});
			}

			// get users gravatar
			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm'
			});

			// encrypt password (should be a hash)

			user = new User({
				name,
				email,
				avatar,
				password
			});

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();

			// return jsonwebtoken
			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(payload, process.env.JWTSECRET, { expiresIn: 3600000 }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
