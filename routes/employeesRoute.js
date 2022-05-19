const express = require("express");
const Employees = require("../models/employees");
const getSequence = require("../models/sequence");
const {check, validationResult} = require("express-validator");
const router = express.Router();
router.get("/", async(req, res) => {
    try{
        const emp = await Employees.find();
        if(emp.length>0){
            res.json(emp);
        }else{
            res.send("No data");
        }
    }catch(err){
        res.send(err);
    }
})

router.get("/getEmployees", [
    check("page")
    .notEmpty()
    .withMessage("Page Number is required")
    .isNumeric()
    .withMessage("Page Number must be numeric"),
    check("limit")
    .notEmpty()
    .withMessage("Limit value is required")
    .isNumeric()
    .withMessage("Limit value must be numeric"),
    ], async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({Errors: errors.array()});
        }
        try{
            const emp = await Employees.find().skip(req.query.page*10).limit(req.query.limit);
            if(emp.length>0){
                res.json(emp);
            }else{
                res.send("No data");
            }
        }catch(err){
            res.send(err);
        }
})

router.get("/searchEmployee", [
    check("id")
    .notEmpty()
    .withMessage("Employee id is required")
    .isNumeric()
    .withMessage("Employee id must be numeric")
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({Errors: errors.array()});
    }
    try{
        const emp = await Employees.find({_id: req.query.id});
        if(emp.length>0){
            res.json(emp);
        }else{
            res.send("No data");
        }
    }catch(err){
        res.send(err);
    }
})

router.post("/addEmployee", async(req, res) => {
    var id;
    await getSequence.getSequence("employeeId")
    .then(sequence =>{
        id = sequence
    })
    .catch(error => console.log(error));
    const emp = new Employees({
        _id: id,
        name: req.body.name,
        project: req.body.project,
        team: req.body.team
    })

    try{
        const e1 = await emp.save();
        res.json(e1);
    }catch(err){
        res.send(err);
    }
})

router.patch("/updateEmployee", [
    check("id")
    .notEmpty()
    .withMessage("Employee id is required")
    .isNumeric()
    .withMessage("Employee id must be numeric")
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({Errors: errors.array()});
    }
    try{
        const emp = await Employees.findOneAndUpdate({_id: req.query.id}, {
            name: req.body.name,
            project: req.body.project,
            team: req.body.team
        }, {runValidators: true})
        if(emp != null){
            res.send("Employee details updated");
        }else{
            res.send("Employee details does not exist");
        }
    }catch(err){
        res.send(err);
    }
})

router.delete("/deleteEmployee", [
    check("id")
    .notEmpty()
    .withMessage("Employee id is required")
    .isNumeric()
    .withMessage("Employee id must be numeric")
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({Errors: errors.array()});
    }
    try{
        const emp = await Employees.findOneAndDelete({_id: req.query.id});
        if(emp != null){
            res.send("Employee details deleted");
        }else{
            res.send("Employee details does not exist");
        }
    }catch(err){
        res.send(err);
    }
})

module.exports = router;