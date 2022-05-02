const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    empId: {
        type: Number,
        required: true
    },
    empName: {
        type: String,
        required: true
    },
    empProject: {
        type: String,
        required: true
    },
    empTeam: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Employees", employeeSchema)