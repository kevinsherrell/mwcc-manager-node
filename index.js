const express = require('express');
const app = express();
const mongoose = require("mongoose");


const bodyParser = require('body-parser');
const morgan = require('morgan');
// const methodOverride = require('method-override')
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');

require('dotenv').config();
const port = process.env.PORT;
const path = require('path');


const MONGO_URI = process.env.MONGO_URI

app.get('/'), (req, res) => {
    res.render('index');
}


// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH' ],
//     allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-WIth'],
//     credentials: true,
//     exposedHeaders: ['set-cookies']
// }))

app.use(express.static(__dirname + "/public"));
// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev'));
// app.use(methodOverride('_method'));
// mongoose.connect(MONGO_URI, {useNewUrlParser: true}, ()=>console.log("Connected to database"));
mongoose.connect(MONGO_URI, (err) => {
    if(err) console.log(err);
    console.log("Connected to database")
});

// const store = MongoStore.create({
//     mongoUrl: MONGO_URI
// })

// app.use(session({
//     secret: process.env.SECRET,
//     savedUninitialized: false,
//     resave: false,
//     store: store,
//     cookie: {
//         httpOnly: true,
//         path: '/',
//         secure: false,
//         maxAge: 1000 * 60 * 60
//     }
// }))

app.use('/user', require('./Controller/User'));
app.use('/store', require('./Controller/Store'));
app.use('/profile', require('./Controller/Profile'));
app.use('/period', require('./Controller/PayPeriod'));
app.listen(port, () => {
    console.log(`example app listening to port ${port}`)
});