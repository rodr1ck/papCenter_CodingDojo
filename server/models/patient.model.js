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
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        paps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pap' }],
    },
    { timestamps: true },
)

PatientSchema.plugin(uniqueValidator, { message: 'Error, {PATH} ya existe' })

module.exports.Patient = mongoose.model('Patient', PatientSchema)
