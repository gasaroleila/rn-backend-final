import { model, Schema } from "mongoose";


const vehicleSchema = new Schema({
    chasisNumber: {
        type: String,
        required: true,
    },

    plateNumber: {
        type: String,
        required: true,
    },

    company: {
        type: String,
        required: true,
    },

    year: {
        type: Number,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    model: {
        type: Object,
        required: true,
    },

    ownerId: {
        type: Schema.Types.ObjectId,
        ref:'carOwner'
    }

}, { timestamps: true })

export const Vehicle = model('Vehicle', vehicleSchema)