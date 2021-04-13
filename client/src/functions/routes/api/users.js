const { db } = require('../../util/admin');

const config = require('../../util/config');
const { validateLogin, validateRegister } = require("../../util/validators");
const firebase = require('firebase');
firebase.default.initializeApp(config);

/* Registers the user by creating an auth credential then adding
to the database and sets the http cookie */
exports.register = (req,res) => {
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };
    let token, userId;

    const { valid, errors } = validateRegister(newUser);
    if (!valid) return res.status(400).json(errors);

    return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((data) => {
        userId = data.user.uid;
        return data.user.getIdToken();
    })
    .then((idToken) => {
        token = idToken;
        const userCreds = {
            userId,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            createdAt: new Date().toISOString()
        };
        res.cookie("Bearer", token, {path: "/", httpOnly: true, sameSite: 'strict'})
        return db.doc(`/users/${newUser.email}`).set(userCreds);
    })
    .then(() => {
        return res.status(201).json({token});
    })
    .catch(err => {
        if (err.code === "auth/email-already-in-use"){
            return res.status(400).json({generic: "Email is already in use"});
        } else return res.status(500).json({errors: err.code});
    });
}

/* Logs the user in by calling firebase's auth api */
exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    const { valid, errors } = validateLogin(user);
    if (!valid) return res.status(400).json(errors);

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
        return data.user.getIdToken();
    })
    .then(token => {
        res.cookie("Bearer", token, {path: "/", httpOnly: true, sameSite: 'strict'})
        return res.json({token});
    })
    .catch(err => {
        return res.status(403).json({general: "Invalid email or password."});
    })
};

/* Gets user by scanning database for the user's email */
exports.getAuthUser = (req, res) => {
    const userData = {};
    db.doc(`/users/${req.user.email}`)
    .get()
    .then(doc => {
        if (doc.exists) {
            userData.credentials = doc.data();
            return res.json(userData);
        }
    })
    .catch(err => {
        return res.status(500).json({errors: err.code});
    })
};

/* Logs the user out by setting the cookie to None */
exports.logout = (req, res) => {
    res.cookie("Bearer", "None", {httpOnly: true})
    return res.status(200).json({success: true, message: "User logged out successfully"})
}