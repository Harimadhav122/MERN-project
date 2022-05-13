const mongoose = require("mongoose");

const sequenceSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        required: true
    }
})
const Sequence = mongoose.model("Sequence", sequenceSchema)

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

module.exports = {
    Sequence,
    getSequence
}