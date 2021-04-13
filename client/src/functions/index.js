const functions = require('firebase-functions');
const { getActivities, postActivitiy, deleteActivity } = require('./routes/api/activities');
const { register, login, logout, getAuthUser } = require('./routes/api/users');
const auth = require('./middleware/auth');
const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());



app.get('/activities', auth, getActivities);
app.post('/activity', auth, postActivitiy);
app.delete('/activity/:activityId', auth, deleteActivity);


app.post('/register', register);
app.post('/login', login);
app.post('/logout', logout);
app.get('/user', auth, getAuthUser);


exports.api = functions.https.onRequest(app);
