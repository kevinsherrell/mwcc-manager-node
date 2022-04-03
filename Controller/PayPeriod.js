const express = require('express');
const mongoose = require('mongoose');
const payPeriodRouter = express.Router();
const bcrypt = require('bcrypt');

const PayPeriod = require('../Model/PayPeriod');


payPeriodRouter.get('/all', (req, res) => {
    PayPeriod.find((err, periods) => {
        try {
            res.status(200).send(periods);
        } catch (err) {
            res.send(err);
        }
    })
})

payPeriodRouter.get("/:id", (req, res) => {
    PayPeriod.findOne({_id: req.params.id}, (err, period) => {
        try {
            res.status(200).send(period);
        } catch (err) {
            res.status(400).send(err);
        }
    })
})
payPeriodRouter.post('/create', (req, res) => {
    PayPeriod.create({
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
        start: req.body.start,
        end: req.body.end
    }, (err, period) => {
        try {
            res.status(201).send(period);
        } catch (err) {
            res.status(500).send(err.message);
        }
    })

})

payPeriodRouter.put('/update/:id', (req, res) => {

    PayPeriod.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, updatedPeriod) => {

        try {
            return res.status(201).send(updatedPeriod);
        } catch (err) {
            return res.status(500).send(err);

        }
    })


})

module.exports = payPeriodRouter;