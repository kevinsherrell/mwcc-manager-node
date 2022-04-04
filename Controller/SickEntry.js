const express = require('express');
const mongoose = require('mongoose');
const sickEntryRouter = express.Router();
const bcrypt = require('bcrypt');

const Timesheet = require('../Model/Timesheet');
const SickEntry = require('../Model/SickEntry');

sickEntryRouter.get('/all', (req, res) => {
    SickEntry.find((err, entries) => {
        try {
            res.status(200).send(entries);
        } catch (err) {
            res.send(err.message);
        }
    })
})

sickEntryRouter.get("/:id", (req, res) => {
    SickEntry.findOne({_id: req.params.id}, (err, entry) => {
        try {
            res.status(200).send(entry);
        } catch (err) {
            res.status(400).send(err);
        }
    })
})


sickEntryRouter.post('/create', (req, res) => {
    console.log("firing");
    console.log(req.body);
    let newEntry = new SickEntry({
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
        timesheet: req.body.timesheet,
        date: req.body.date,
    })
    SickEntry.create(newEntry)
        .then(entry => {
            Timesheet.findOne({_id: entry.timesheet}, (err, timesheet) => {
                try {
                    timesheet.sickEntries.push(entry.id);
                    timesheet.save();
                    res.status(201).send("Success");
                } catch (err) {
                    res.status(500).send(err);
                }

            })
        })
})

sickEntryRouter.put('/update/:id', (req, res) => {

    SickEntry.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, updatedEntry) => {

        try {
            updatedEntry.dateUpdated = Date.now();
            updatedEntry.save();

            return res.status(201).send(updatedEntry);
        } catch (err) {
            return res.status(500).send(err);

        }
    })

})


module.exports = sickEntryRouter;