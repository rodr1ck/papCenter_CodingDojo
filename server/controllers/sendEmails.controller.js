const { emailSend, emailStop } = require('./emailSender')
var schedule = require('node-schedule')
const { getAllPaps } = require('../controllers/pap.controller')
const { getAllPatients } = require('../controllers/patient.controller')
const { Patient } = require('../models/patient.model')
const { Pap } = require('../models/pap.model')

const sendEmails = async () => {
    let patients = {}

    try {
        patients = await Patient.find({}).exec()
        //res.json(patients)
    } catch (err) {
        console.error(err)
        // res.status(500).json(err)
    }

    // console.log(patients)
    let y = {}

    let variable = await patients.map(async (pat) => {
        const paps = await Pap.find({ patientId: pat._id }).exec()
        //console.log(paps)
        let x
        let { email } = pat
        if (paps !== undefined) {
            x = paps.map((pap1) => {
                const { next_pap } = pap1
                let myObj = {}
                myObj[email] = next_pap
                return myObj
                // return date_taken
            })
            // console.log({x})
        }
        return x
    })

    let result = variable.map(async (val) => {
        const x = await val
        let next_pap = '2021-06-12T13:34:14-04:00'
        let patient_email = 'rodrigo.orelana@gmail.com'
        let email_subject = 'Scheduled Email'
        let email_text = 'Hi there. This email was automatically sent by us.'
        let info_email = { next_pap, patient_email, email_subject, email_text }

        if (x.length > 0) {
            // console.log(x)
            x.map((email) => {
                //console.log(email)
                for (let key of Object.keys(email)) {
                    //console.log(key)
                    //console.log(email[key])
                    let datePap = email[key]
                    //console.log({ datePap })
                    //console.log({ key })
                    let now = new Date()
                    //now.setHours(now.getHours() - 4);
                    let fechaProximoPap = new Date(datePap)
                    console.log({fechaProximoPap})
                    console.log({now})
                    if (fechaProximoPap > now) {
                        console.log("sending pap's emails1")
                        info_email = {
                            next_pap: datePap,
                            patient_email: key,
                            email_subject,
                            email_text,
                        }
                        emailSend(info_email)
                    }
                }
            })

            //const next_pap = '2021-06-12T13:34:14-04:00'
            //let patient_email = 'rodrigo.orelana@gmail.com'
            //const email_subject = 'Scheduled Email'
            // const email_text = 'Hi there. This email was automatically sent by us.'
            // const info_email = { next_pap, patient_email, email_subject, email_text }
            // emailSend(info_email)
        }
    })

    /*     variable
        .then(function (result) {
            console.log(result) // "Some User token"
        })
        .catch((err) => {
            console.error(err)
        }) */
    //console.log(variable)

    /*     const next_pap = '2021-06-12T13:34:14-04:00'
    let patient_email = 'rodrigo.orelana@gmail.com'
    const email_subject = 'Scheduled Email'
    const email_text = 'Hi there. This email was automatically sent by us.'
    const info_email = { next_pap, patient_email, email_subject, email_text }
    emailSend(info_email)  */

/*     var jobList = schedule.scheduledJobs
    let current_job = schedule.scheduledJobs[patient_email]
    for (jobName in jobList) {
        var job = 'jobList.' + jobName
        console.log(job)
    } */
}
module.exports = { sendEmails }
