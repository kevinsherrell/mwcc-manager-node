const express = require('express');
const mongoose = require('mongoose');
const vacationEntryRouter = express.Router();
const bcrypt = require('bcrypt');

const Timesheet = require('../Model/Timesheet');
const VacationEntry = require('../Model/VacationEntry');

vacationEntryRouter.get('/all', (req, res) => {
    VacationEntry.find((err, entries) => {
        try {
            res.status(200).send(entries);
        } catch (err) {
            res.send(err.message);
        }
    })
})

vacationEntryRouter.get("/:id", (req, res) => {
    VacationEntry.findOne({_id: req.params.id}, (err, entry) => {
        try {
            res.status(200).send(entry);
        } catch (err) {
            res.status(400).send(err);
        }
    })
})


vacationEntryRouter.post('/create', (req, res) => {
    console.log("firing");
    console.log(req.body);
    let newEntry = new VacationEntry({
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
        timesheet: req.body.timesheet,
        date: req.body.date,
    })
    VacationEntry.create(newEntry)
        .then(entry => {
            Timesheet.findOne({_id: entry.timesheet}, (err, timesheet) => {
                try {
                    timesheet.vacationEntries.push(entry.id);
                    timesheet.save();
                    res.status(201).send("Success");
                } catch (err) {
                    res.status(500).send(err.message);
                }

            })
        })
})

vacationEntryRouter.put('/update/:id', (req, res) => {
    VacationEntry.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, updatedEntry) => {
        try {
            updatedEntry.dateUpdated = Date.now();
            updatedEntry.save();

            return res.status(201).send(updatedEntry);
        } catch (err) {
            return res.status(500).send(err);

        }
    })

})


module.exports = vacationEntryRouter;