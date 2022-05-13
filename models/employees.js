const mongoose = require("mongoose");
const validator = require("validator");

const employeeSchema = new mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isAlpha(value)){
                throw new Error("Name should contain characters only");
            }
        }
    },
    project: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isAlpha(value)){
                throw new Error("Project name should contain characters only");
            }
        }
    },
    team: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isAlphanumeric(value)){
                throw new Error("Team name should contain characters and numbers only");
            }
        }
    }
})

module.exports = mongoose.model("Employees", employeeSchema);