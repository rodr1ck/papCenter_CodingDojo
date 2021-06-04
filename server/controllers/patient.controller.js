const { Patient } = require('../models/patient.model')
const { User } = require('../models/user.model')

const newPatient = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            address,
            dob,
            date_toma,
            date_recep,
            result,
            next_pap,
            createdBy,
        } = req.body
        console.log(req.body)
        //const user = await User.findById(createdBy).exec()
        const patient = Patient({
            createdBy: createdBy,
            firstName,
            lastName,
            email,
            address,
            dob,
            date_toma,
            date_recep,
            result,
            next_pap,
        })
        console.log({ patient })
        await patient.save()

        // user.patients.push(patient)
        //  await user.save()

        const userUpdate = await User.findByIdAndUpdate(
            createdBy,
            { $push: { patients: patient } },
            { upsert: true, new: true },
        )

        res.sendStatus(201)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
}

module.exports = { newPatient }
