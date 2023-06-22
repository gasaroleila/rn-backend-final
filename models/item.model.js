import { model, Schema } from "mongoose";


const itemSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    thumbnail: {
        type:String,
        default:'https://res.cloudinary.com/code-ama/image/upload/v1631563998/defaultProfile_tslvta.jpg'
    },

    thumbnail_cloudinary_id: {
        type: String,
        default: ""
    }

}, { timestamps: true })

export const Item = model('Item', itemSchema)