const express = require('express');
const router = express.Router();

// @route           GET api/profile/me
// @description     GET current user's profile
// @access          Private
router.get('/', (req, res) => {
	try {
		res.json('pong');
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
