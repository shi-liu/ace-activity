const { admin, db } = require('../util/admin');

module.exports = (req, res, next) => {
    if (req.headers.cookie) {
        idToken = req.headers.cookie.split("=")[1]
    } else {
        return res.status(403).json({ message: "Unauthorized"})
    }

    admin.auth().verifyIdToken(idToken)
    .then(decodedToken => {
        req.user = decodedToken
        return db.collection('users')
        .where('userId', '==', req.user.uid)
        .limit(1)
        .get();
    })
    .then(data => {
        req.user.ownerId = data.docs[0].data().email;
        return next();
    })
    .catch(err => {
        return res.status(403).json(err)
    })
};