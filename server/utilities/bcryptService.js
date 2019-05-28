const bcrypt = require('bcrypt');
require('dotenv').config();

// creates hash from plaintext
async function createHash(plaintext){
    try {
        let hash = await bcrypt.hash(plaintext, parseInt(process.env.SALT_ROUNDS));
        return hash;
    } catch (err) {
        if (err) throw err;
    }
}

// compares plaintext with hash
async function compareHash(plaintext, hash){
    try {
        const match = await bcrypt.compare(plaintext, hash);
        return match
    } catch (err){
        if (err) throw err;
    }
}

module.exports = {
    createHash,
    compareHash
}
