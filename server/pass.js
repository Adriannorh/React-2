const { v4: uuid } = require('uuid');
const crypto = require('crypto');

const users = [{
	username: 'admin',
	password: 'ee62d93bb358624b61287b831018e6ac3a8532c29e1ba51bb8c737b72e1e2dea',
	salt: '7ecf32d3-f830-4b86-a60f-c1a0d3f22fe4',
}];

const sessions = {};

const handleUsers = (req, res) => {
	const userMatch = users.find(user => {
		const hashedPassword = crypto.createHash('sha256').update(`${req.body.password}${user.salt}`).digest('hex');
		return user.username === req.body.username && user.password === hashedPassword;
	});

	if (userMatch) {
        const token = uuid();
        sessions[token] = userMatch;
        return res.json({status: 'logged in', token: token});
    }
    return res.status(401).json({status: 'authentication failed'});
};

const identify = (req, res, next) => {
	const token = req.headers['authentication'];
	const user = sessions[token];
	if (user) {
		req.user = user;
		return next();
	}
	return res.status(401).send('Unauthorized');
};

module.exports = {
    handleUsers,
    identify,
};
