const generateString = require("../utils/randomString.js");
const express = require("express");

const SnipModel = require("../models/Snip.js");
const verifyToken = require("../middleware/auth.js");

const router = express.Router();

router.get("/user/:userid", verifyToken, async (req, res) => {
    const userid = req.params.userid;
    const snipList = await SnipModel.find({userid});
    res.json(snipList);
});

router.get("/:id", async (req, res) => {
    const snip = await SnipModel.findOne({alias: req.params.id});
    res.json(snip);
});

router.post("/", async (req, res) => {
    if(!req.body.alias){
        const alias = generateString();
        req.body.alias = alias;
    }
    const newSnip = new SnipModel(req.body);
    try{
        const savedSnip = await newSnip.save();
        console.log(savedSnip);
        return res.json({message: "Snip added successfully", id: savedSnip.alias});
    }
    catch(err){
        if(err.code === 11000){
            return res.json({message: "Alias already taken"});
        }
        console.log(err);
    }
    res.json({message: "Something went wrong"});
});

router.patch("/", verifyToken, async (req, res) => {
    if(!req.body.alias){
        const alias = generateString();
        req.body.alias = alias;
    }
    const snipID = req.body.snipID;
    const title = req.body.title;
    const snip = req.body.snip;
    const alias = req.body.alias;
    try{
        const updateStatus = await SnipModel.updateOne({_id: snipID}, {$set: {title, snip, alias}});
        if(updateStatus.acknowledged){
            return res.json({message: "Snip updated successfully", id: alias});
        }
        return res.json({message: "Something went wrong"});
    }
    catch(err){
        if(err.code === 11000){
            return res.json({message: "Alias already taken"});
        }
        return res.json({message: "Something went wrong"});
    }
});

router.delete("/:snipID", verifyToken, async (req, res) => {
    const snipID = req.params.snipID;
    try{
        const deleteStatus = await SnipModel.deleteOne({_id: snipID});
        if(deleteStatus.deletedCount > 0){
            return res.json({message: "Snip deleted"});
        }
        return res.json({message: "Something went wrong"});
    }
    catch(err){
        return res.json({message: "Something went wrong"});
    }
});

module.exports = router;