const mongoose = require("mongoose");



const doctorSchema = mongoose.Schema({
    name: String,
    image: String,
    specialization: String,
    experience: String,
    location: String,
    date: String,
    slots: Number,
    fee: Number,
    userID: String
})


const DoctorModel = mongoose.model("doctor",doctorSchema);


module.exports={
    DoctorModel
}
