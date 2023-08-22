const express = require("express");
const { DoctorModel } = require("../models/doctor.model");



const doctorRouter = express.Router();


doctorRouter.get("/", async (req, res) => {
    try {
        const { sort, department, search, page } = req.query;
        const filter = department ? { department } : {};
        const sortOption = sort === "asc" ? { salary: 1 } : sort === "desc" ? { salary: -1 } : {};
        const currentPage = parseInt(page) || 1;
        const perPage = 5;
        const skip = (currentPage - 1) * perPage;
        const searchQuery = search ? { firstName: { $regex: search, $options: "i" } } : {};

        const totalCount = await DoctorModel.countDocuments({
            ...filter,
            ...searchQuery,
        });

        const doctor = await DoctorModel.find({ ...filter, ...searchQuery, })
            .sort(sortOption)
            .skip(skip)
            .limit(perPage);

        res.status(200).send({
            doctor,
            totalCount,
            currentPage,
            totalPages: Math.ceil(totalCount / perPage),
        });
    } catch (error) {
        console.log({ "/doctorget": error.message })
        res.status(500).send({ msg: error.message })
    }
})

doctorRouter.post('/', async (req, res) => {
    try {
        const { email } = req.body;
        const isDoctorExists = await DoctorModel.findOne({ email });
        if (isDoctorExists) return res.status(400).send({ msg: "Doctor Already Exists" });

        const newDoctor = new DoctorModel({ ...req.body });
        await newDoctor.save();
        res.status(201).send({ msg: "New Doctor Created" })
    } catch (error) {
        console.log({ "/doctor": error.message })
        res.status(500).send({ msg: error.message })
    }
})


doctorRouter.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        await DoctorModel.findByIdAndUpdate({ _id: id }, payload);
        res.status(200).send({ msg: "doctor data updated successfully!" })
    } catch (error) {
        console.log({ "/doctorupdate": error.message })
        res.status(500).send({ msg: error.message })
    }
})


doctorRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await DoctorModel.findByIdAndDelete({ _id: id });
        res.status(200).send({ msg: "Doctor deleted successfully!" })
    } catch (error) {
        console.log({ "/doctordelete": error.message })
        res.status(500).send({ msg: error.message })
    }
})







module.exports = {
    doctorRouter

}













