const mongoose = require("mongoose");
const validator = require("validator");

const sequenceSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isAlpha(value)){
                throw new Error("Id should contain characters only");
            }
        }
    },
    seq: {
        type: Number,
        required: true
    }
})

module.exports.Sequence = mongoose.model("Sequence", sequenceSchema);

const Sequence = mongoose.model("Sequence", sequenceSchema);
const getSequence = async(seqName) => {
    return new Promise((resolve, reject) => {
        Sequence.findOneAndUpdate(
            {"_id": seqName}, 
            {"$inc": {"seq": 1}},
            (error, sequence) => {
                if(error){
                    reject(error);
                }
                if(sequence){
                    resolve(sequence.seq+1);
                }else{
                    resolve(null);
                }
            }
        )
    })
    
}

module.exports.getSequence = getSequence;