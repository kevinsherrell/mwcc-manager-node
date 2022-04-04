const express = require('express');
const mongoose = require('mongoose');
const regularEntryRouter = express.Router();
const bcrypt = require('bcrypt');

const Timesheet = require('../Model/Timesheet');
const Special = require('../Model/Special');
const RegularEntry = require('../Model/RegularEntry');

regularEntryRouter.get('/all', (req, res) => {
    RegularEntry.find((err, entries) => {
        try {
            res.status(200).send(entries);
        } catch (err) {
            res.send(err.message);
        }
    })
})

regularEntryRouter.get("/:id", (req, res) => {
    RegularEntry.findOne({_id: req.params.id}, (err, entry) => {
        try {
            res.status(200).send(entry);
        } catch (err) {
            res.status(400).send(err);
        }
    })
})


regularEntryRouter.post('/create', (req, res) => {
    console.log("firing");
    let newEntry = new RegularEntry({
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
        timesheet: req.body.timesheet,
        in: req.body.in,
        out: req.body.in
    })
    RegularEntry.create(newEntry)
        .then(entry => {
            Timesheet.findOne({_id: entry.timesheet}, (err, timesheet) => {
                try {
                    timesheet.regularEntries.push(entry.id);
                    timesheet.save();
                    res.status(201).send("Success");
                } catch (err) {
                    res.status(500).send(err);
                }

            })
        })
})

regularEntryRouter.put('/update/:id', (req, res) => {

    RegularEntry.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, updatedEntry) => {

        try {

            let timeDiff = updatedEntry.out.getTime() - updatedEntry.in.getTime();
            let diffSeconds = timeDiff / 1000;
            let diffMinutes = diffSeconds / 60;
            let diffHours = diffMinutes / 60;

            console.log(updatedEntry.out.getTime() - updatedEntry.in.getTime());
            console.log(timeDiff);
            console.log(diffHours);

            updatedEntry.totalHours = diffHours;
            updatedEntry.save();
            return res.status(201).send(updatedEntry);
        } catch (err) {
            return res.status(500).send(err);

        }
    })

})


module.exports = regularEntryRouter;