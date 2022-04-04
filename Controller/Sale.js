const express = require('express');
const mongoose = require('mongoose');
const saleRouter = express.Router();
const bcrypt = require('bcrypt');

const Sale = require('../Model/Sale');
const Timesheet = require('../Model/Timesheet');

saleRouter.get('/all', (req, res) => {
    Sale.find((err, sales) => {
        try {
            res.status(200).send(sales);
        } catch (err) {
            res.send(err);
        }
    })
})

saleRouter.get("/:id", (req, res) => {
    Sale.findOne({_id: req.params.id}, (err, sale) => {
        try {
            res.status(200).send(sale);
        } catch (err) {
            res.status(400).send(err);
        }
    })
})


saleRouter.post('/create', (req, res) => {
    let newSale = new Sale({
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
        timesheet: req.body.timesheetId,
        cost: req.body.cost,
        salePrice: req.body.salePrice,
    })


    Sale.create(newSale)
        .then(sale => {
            Timesheet.findOne({_id: sale.timesheet}, (err, timesheet) => {
                try{
                    timesheet.sales.push(sale.id);
                    timesheet.save();
                    res.status(201).send("success");
                }catch(err){
                    res.status(500).send(err.message);
                }

            })
        })
})

saleRouter.put('/update/:id', (req, res) => {

    Sale.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, updatedSale) => {
        try {
            updatedSale.profit = updatedSale.salePrice - updatedSale.cost;
            updatedSale.save();
            return res.status(201).send(updatedSale);
        } catch (err) {
            return res.status(500).send(err.message);

        }
    })

})


module.exports = saleRouter;