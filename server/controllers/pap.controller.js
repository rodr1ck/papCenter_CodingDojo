const { Patient } = require('../models/patient.model')
const { User } = require('../models/user.model')
const { Pap } = require('../models/pap.model')
const { emailSend, emailStop } = require('./emailSender')

const newPap = async (req, res) => {
    try {
        const {
            date_taken,
            date_recep,
            result,
            next_pap,
            midwifeId,
            patientId,
        } = req.body
        console.log(req.body)

        const pap = Pap({
            date_taken,
            date_recep,
            result,
            next_pap,
            midwifeId,
            patientId,
        })
        await pap.save()

        const patientUpdate = await Patient.findByIdAndUpdate(
            patientId,
            { $push: { paps: pap } },
            { upsert: true, new: true },
        )

        console.log({ pap })
        res.json(pap)

        console.log({ patientUpdate })
        const { email: patient_email } = patientUpdate
        //send email
        let email_subject = 'Scheduled Email'
        let email_text = 'Hi there. This email was automatically sent by us.'
        let info_email = { next_pap, patient_email, email_subject, email_text }
        try {
            info_email = {
                next_pap,
                patient_email,
                email_subject,
                email_text,
            }
            emailSend(info_email)
        } catch (err) {
            console.error(err)
            res.status(500).json(err)
        }
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }

    /*     try {
        const sendEmailsUpdate = await sendEmails()
    } catch (error) {
        console.error(error)
    } */
}

//get all paps of a patient
const getAllPaps = async (req, res) => {
    try {
        const paps = await Pap.find({ patientId: req.params.id }).exec()
        res.json(paps)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

const deletePap = async (req, res) => {
    try {
        const pap = await Pap.deleteOne({ _id: req.params.id })
        res.json(pap)
    } catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
}

const editPap = async (req, res) => {
    try {
        const pap = await Pap.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            {
                new: true,
            },
        )
        res.json(pap)
    } catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
}

const getOnePap = async (req, res) => {
    try {
        const { id } = req.params
        console.log( id)
        const pap = await Pap.findById(id).exec()
        console.log(pap)
        res.json(pap)
    } catch (e) {
        console.error(e)
        return { success: false, data: e.message }
    }
}

module.exports = { newPap, getAllPaps, deletePap, editPap, getOnePap }

