const express = require("express");
const Sequence = require("../models/sequence");
const router = express.Router();

router.get("/getSeq", async(req, res) => {
    try{
        const seq1 = await Sequence.Sequence.find();
        if(seq1.length>0){
            res.json(seq1);
        }else{
            return res.send("No data");
        }
    }catch(err){
        res.send(err);
    }
})

router.post("/addSeq", async(req, res) => {
    try{
        const seq1 = await Sequence.Sequence.find({_id: req.body._id});
        if(seq1.length>0){
            res.send("Data already exists with given id");
        }else{
            const seq2 = new Sequence.Sequence({
                _id: req.body._id,
                seq: req.body.seq
            })
            await seq2.save();
            res.send(seq2);
        }
    }catch(err){
        res.send(err);
    }
})

module.exports = router;