const express = require("express")
const Employees = require("../models/employees")
const router = express.Router()

router.get("/", async(req, res) => {
    try{
        const emp = await Employees.find()
        res.json(emp)
    }catch(err){
        res.send("Error" + err)
    }
})

router.get("/:id", async(req, res) => {
    try{
        const emp = await Employees.find({empId: req.params.id})
        res.json(emp)
    }catch(err){
        res.send("Error" + err)
    }
})

router.post("/addEmployee", async(req, res) => {
    const emp = new Employees({
        empId: req.body.empId,
        empName: req.body.empName,
        empProject: req.body.empProject,
        empTeam: req.body.empTeam
    })

    try{
        const e1 = await emp.save()
        res.json(e1)
    }catch(err){
        res.send("Error" + err)
    }
})

router.patch("/updateEmployee/:id", async(req, res) => {
    try{
        const emp = await Employees.findOneAndUpdate({empId: req.params.id}, {
            empTeam: req.body.empTeam
        })
        res.send("Employee updated")
    }catch(err){
        res.send("Error" + err)
    }
})

router.delete("/deleteEmployee/:id", async(req, res) => {
    try{
        await Employees.findOneAndDelete({empId: req.params.id})
        res.send("Employee deleted")
    }catch(err){
        res.send("Error" + err)
    }
})

module.exports = router