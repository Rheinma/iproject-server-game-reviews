// const jwt = require("jsonwebtoken");

// const signToken = (payload) => jwt.sign(payload,process.env.SECRET);
// const verifyToken = (token) => jwt.verify(token,process.env.SECRET);

// module.exports = {
// 	signToken,
// 	verifyToken,
// };


const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const signToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
}

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = { signToken, verifyToken }