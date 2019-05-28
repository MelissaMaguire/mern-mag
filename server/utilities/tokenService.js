require('dotenv').config();
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;

// takes in data and generates a token
async function createToken(user) {
    try {
        let token = await jwt.sign({user}, SECRET);
        return token;
    } catch (err) {
        if (err) throw err;
    }
}

// decodes token into data
async function validToken(token) {
    try {
        let user = await jwt.verify(token, SECRET);
        console.log(user);
    } catch (err) {
        if (err) throw err;
    }
}

module.exports = {
    createToken,
    validToken
}