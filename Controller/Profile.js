const express = require('express');
const mongoose = require('mongoose');
const profileRouter = express.Router();
const bcrypt = require('bcrypt');

const Profile = require('../Model/Profile');

// Get Users
profileRouter.get('/all', (req, res) => {
    Profile.find((err, profiles) => {
        try {
            res.status(200).send(profiles);
        } catch (err) {
            res.send(err);
        }
    })
})

profileRouter.get("/:id", (req,res)=>{
    Profile.findOne({_id: req.params.id}, (err, profile)=>{
        try{

            res.status(200).send(profile);
        }catch(err){
            res.status(400).send(err);
        }
    })
})
// Update User
profileRouter.put('/update/:id', (req, res) => {

    Profile.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, updatedProfile) => {

        try {
            return res.status(201).send(updatedProfile);
        } catch (err) {
            return res.status(500).send(err);

        }
    })


})

module.exports = profileRouter;