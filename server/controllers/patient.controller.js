const { Patient } = require('../models/patient.model')
const { User } = require('../models/user.model')

const newPatient = async (req, res) => {
    try {
        const { firstName, lastName, email, address, dob, createdBy } = req.body
       // console.log(req.body)

        const patient = Patient({
            createdBy: createdBy,
            firstName,
            lastName,
            email,
            address,
            dob,
        })
        await patient.save()

        const userUpdate = await User.findByIdAndUpdate(
            createdBy,
            { $push: { patients: patient } },
            { upsert: true, new: true },
        )

        console.log({ patient })
        res.json(patient)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find({}).exec()
        res.json(patients)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const getOnePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findById(
            id,
        ).exec();
        res.json(patient);
    } catch (e) {
        console.error(e);
        return { success: false, data: e.message };
    }
  };

module.exports = { newPatient, getAllPatients, getOnePatient }
