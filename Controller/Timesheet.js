const express = require('express');
const mongoose = require('mongoose');
const timesheetRouter = express.Router();
const bcrypt = require('bcrypt');

const Timesheet = require('../Model/Timesheet');


timesheetRouter.get('/all', (req, res) => {
    Timesheet.find((err, timesheets) => {
        try {
            res.status(200).send(timesheets);
        } catch (err) {
            res.send(err);
        }
    })
})

timesheetRouter.get("/:id", (req, res) => {
    Timesheet.findOne({_id: req.params.id}, (err, timesheet) => {
        try {
            res.status(200).send(timesheet);
        } catch (err) {
            res.status(400).send(err);
        }
    })
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

module.exports = timesheetRouter;