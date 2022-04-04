const express = require('express');
const mongoose = require('mongoose');
const timesheetRouter = express.Router();
const bcrypt = require('bcrypt');

const Timesheet = require('../Model/Timesheet');
const User = require('../Model/User');
const Profile = require('../Model/Profile');

timesheetRouter.get('/all', (req, res) => {
    Timesheet.find((err, timesheets) => {
        try {
            res.status(200).send(timesheets);
        } catch (err) {
            res.send(err.message);
        }
    })
        .populate("special")
        .populate("regularEntries")


})

timesheetRouter.get("/:id", (req, res) => {
    Timesheet.findOne({_id: req.params.id}, (err, timesheet) => {
        try {
            res.status(200).send(timesheet);
        } catch (err) {
            res.status(400).send(err);
        }
    })
        .populate("special")
        .populate("entries")
})
timesheetRouter.post('/create', (req, res) => {
    Timesheet.create({
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
        employee: req.body.employee,
        period: req.body.period
    }, (err, timesheet) => {
        try {
            res.status(201).send(timesheet);
        } catch (err) {
            res.status(500).send(err.message);
        }
    })

})

timesheetRouter.put('/update/:id', (req, res) => {

    Timesheet.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, updatedTimesheet) => {

        try {
            return res.status(201).send(updatedTimesheet);
        } catch (err) {
            return res.status(500).send(err);

        }
    })

})

timesheetRouter.post('/calculateCommission', (req, res) => {
    console.log("calculate is firing");
    let commission;
    User.findOne({_id: req.body.employeeId})
        .then(user => {
            console.log(user.id);
            Timesheet.findOne({employee: user.id})
                .then(timesheet => {
                    console.log(user);
                    console.log(profile);
                    let totalCommission = user.commissionRate * timesheet.profit;
                })

        })
})

module.exports = timesheetRouter;