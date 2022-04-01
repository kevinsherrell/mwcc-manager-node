const express = require('express');
const mongoose = require('mongoose');
const userRouter = express.Router();
const bcrypt = require('bcrypt');

const User = require('../Model/User');
const Profile = require('../Model/Profile');

userRouter.post('/create', (req, res) => {

    User.findOne({email: req.body.email}, (err, user) => {
        try {
            if (user) {
                console.log("This user already exists");
                res.status(400).send("user already exists");
            } else {
                req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
                User.create({
                    dateCreated: Date.now(),
                    dateUpdated: Date.now(),
                    email: req.body.email,
                    password: req.body.password,
                    accountType: req.body.accountType
                })
                    .then(user => {
                        // res.status(200).send("user created");
                        Profile.create({
                            user: user.id,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            store: req.body.storeId,
                            role: req.body.role,
                            salesHourly: req.body.salesHourly,
                            hourlyRegular: req.body.hourlyRegular,
                            uhaulRate: req.body.uhaulRate
                        })
                            .then(profile => {
                                profile.dateCreated = Date.now();
                                profile.dateUpdated = Date.now();
                                res.status(200).send("User and profile created successfully");
                            })
                    })
            }
        } catch (err) {
            console.log(err);
        }

    })
})

module.exports = userRouter;