const express = require('express');
const mongoose = require('mongoose');
const storeRouter = express.Router();

const Store = require('../Model/Store');

storeRouter.post('/create', (req, res) => {
        try{
            Store.create(req.body)
                .then(store=>{
                    store.dateCreated = Date.now();
                    res.status(200).send(store);
                })
        }catch(err){
            console.log(err);
        }
//
})

storeRouter.put("/update", (req,res)=>{

        Store.findByIdAndUpdate({_id: req.body.id}, req.body, {new: true}, (err, store)=>{
            try{
                return res.status(201).send(store);
            }catch(err){
                return res.send(err);
            }
        })

})
module.exports = storeRouter;