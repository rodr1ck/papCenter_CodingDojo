const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')

const PatientSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            validate: {
                validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: 'Please enter a valid email',
            },
            unique: true,
        },
        address: {
            type: String,
            required: [true, 'Address is required'],
            minlength: [8, 'Address must be 8 characters or longer'],
        },
        dob: {
            type: String,
            required: [true, 'DOB is required'],
            minlength: [8, 'DOB must be 8 characters or longer'],
        },
        date_toma: {
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
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true },
)

PatientSchema.plugin(uniqueValidator, { message: 'Error, {PATH} ya existe' })

module.exports.Patient = mongoose.model('Patient', PatientSchema)
