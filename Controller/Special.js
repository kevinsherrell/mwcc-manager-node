const express = require('express');
const mongoose = require('mongoose');
const specialRouter = express.Router();
const bcrypt = require('bcrypt');

const Timesheet = require('../Model/Timesheet');
const Special = require('../Model/Special');

specialRouter.get('/all', (req, res) => {
    Special.find((err, specials) => {
        try {
            res.status(200).send(specials);
        } catch (err) {
            res.send(err.message);
        }
    })
})

specialRouter.get("/:id", (req, res) => {
    Special.findOne({_id: req.params.id}, (err, special) => {
        try {
            res.status(200).send(special);
        } catch (err) {
            res.status(400).send(err);
        }
    })
})
specialRouter.post('/create', (req, res) => {
    let newSpecial = new Special({
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
        timesheet: req.body.timesheet,
        description: req.body.description,
        amount: req.body.amount
    })
    Special.create(newSpecial)
        .then(special => {
            Timesheet.findOne({_id: special.timesheet}, (err, timesheet) => {
                try {
                    timesheet.special.push(special.id);
                    timesheet.save();
                    res.status(201).send("Success");
                } catch (err) {
                    res.status(500).send(err);
                }

            })
        })

})

specialRouter.put('/update/:id', (req, res) => {

    Special.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, updatedSpecial) => {

        try {
            return res.status(201).send(updatedSpecial);
        } catch (err) {
            return res.status(500).send(err);

        }
    })

})


module.exports = specialRouter;