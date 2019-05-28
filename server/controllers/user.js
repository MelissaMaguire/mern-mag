const User = require('./../models/User');
const { createToken, validToken } = require('./../utilities/tokenService');
const { createHash, compareHash } = require('./../utilities/bcryptService');

const cookieOptions = {
    // secure: true,
    httpOnly: true,
    signed: true
}

async function authorized({ signedCookies: { token } }, res) {
    if (token) {
        let { user: { _id, username, password, email } } = await validToken(token);
        let { username, email } = await User.find({ _id, username, password, email });
        res.json({username, password});
    } else {
        res.json({err: 'token expired ya bish'});
    }
}

function login(req, res) {
    res.send(req.body);
}

function logout(req, res) {
    res.send('hit logout route')
}

// old syntax for signup function

// function signup(req, res){
//     User.create(req.body).then(user => {
//         console.log(user);
//     }).catch(err => {
//         if (err) throw err;
//     })
// }

// newest syntax for signup function

async function signup(req, res) {
    try {
        let user = await User.create(req.body);
        let token = await createToken(user);
        console.log(token);
        // let hash = await createHash(token);
        // user.token = hash;
        // user.save();
        console.log(user);
        res.cookie('token', token, cookieOptions);
        res.redirect('/users/authorized');
    } catch (err) {
        if (err) throw err;
    }
}



module.exports = {
    signup,
    login,
    logout,
    authorized
}