const mongoose = require('mongoose')

const PapSchema = mongoose.Schema({
    date_taken: {
        type: String,
        required: [false, 'Date_toma is required'],
        minlength: [8, 'Date_toma must be 8 characters or longer'],
    },
    date_recep: {
        type: String,
        required: [false, 'date_recep is required'],
        minlength: [8, 'date_recep must be 8 characters or longer'],
    },
    result: {
        type: String,
        required: [false, 'result is required'],
        minlength: [8, 'result must be 8 characters or longer'],
    },
    next_pap: {
        type: String,
        required: [false, 'Next_pap is required'],
        minlength: [8, 'Next_pap must be 8 characters or longer'],
    },
    midwifeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
})

const Pap = mongoose.model('Pap', PapSchema)

module.exports = { PapSchema, Pap }
