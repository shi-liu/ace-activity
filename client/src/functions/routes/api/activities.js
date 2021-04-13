const { db } = require('../../util/admin');
const { validateActForm } = require("../../util/validators");

/* Gets user by scanning database for the user's email */
exports.getActivities = (req, res) => {
    db.collection('activities')
    .where("ownerId", "==", req.user.email)
    .orderBy('date','desc')
    .get()
    .then(data => {
        const acts = [];
        data.forEach(doc => {
            acts.push({
                activityId: doc.id,
                ownerId: doc.data().ownerId,
                activity: doc.data().activity,
                duration: doc.data().duration,
                notes: doc.data().notes,
                date: doc.data().date
            });
        });
        return res.json(acts);
    })
    .catch(err => {
        console.log( err.code );
        res.status(500).json({ error: err.code });
    })
};

exports.postActivitiy = (req, res) => {
    const newAct = {
        ownerId: req.user.ownerId,
        activity: req.body.activity,
        duration: req.body.duration,
        notes: req.body.notes,
        date: req.body.date
    };

    const { valid, errors } = validateActForm(newAct);
    if (!valid) return res.status(400).json(errors);

    db.collection('activities')
    .add(newAct)
    .then(doc => {
        const resAct = newAct;
        resAct.activityId = doc.id;
        res.json(resAct);
    })
    .catch(err => {
        res.status(500).json({error: "Error in saving document"})
    })
};

exports.deleteActivity = (req, res) => {
    const document = db.doc(`/activities/${req.params.activityId}`);
    document.get()
    .then((doc) => {
        if (!doc.exists) {
            return res.status(404).json({error: "Activity not found"});
        }
        if (doc.data().userid != req.user.userid) {
            return res.status(403).json({error: "Unauthorized"});
        } else {
            return document.delete()
        }
    })
    .then(() => {
        res.json({message: "Activity deleted successfully"});
    })
    .catch((err) => {
        return res.status(500).json({error: err.code});
    });
};