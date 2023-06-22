import mongoose from "mongoose"
const { Schema, model }= mongoose

import jsonwebtoken from 'jsonwebtoken'
const {sign} = jsonwebtoken

const userSchema = new Schema({
    names:{
        type:String,
        minLength:5,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    nationalId:{
        type: String,
        length: 16,
        required:true
    },

    phone:{
        type:String,
        length: 13,
        required:true
    },
    
    address:{
        type: String,
        required: true
    },

    // profilePicture:{
    //     type:String,
    //     default:'https://res.cloudinary.com/code-ama/image/upload/v1631563998/defaultProfile_tslvta.jpg'
    // },

    password:{
        type:String,
        minLength:8,
        required:true
    },

    // profilePicture_cloudinary_id: {
    //     type: String,
    //     default: ""
    // },
    accountType:{
        type:String,
        enum: ['voter', 'admin'],
        required: true
    },

    hasVoted: {
        type: Boolean,
        default: false
    }
   
    // passwordResetLink:{
    //     type: Object,
    //     default: null
    // },
    // requestPasswordReset:{
    //     type: Boolean,
    //     default: false
    // },
    // loginLink:{
    //     type: Object,
    //     default: null
    // },
    // requestLogin:{
    //     type: Boolean,
    //     default: false
    // },

    // status: {
    //     type: String,
    //     enum: ["UNVERIFIED", "VERIFICATION", "VERIFIED"],
    //     default: "UNVERIFIED"
    // }
}, { timestamps: true })

userSchema.methods.generateAuthToken = function(){
    const token = sign(
        {data:this},
        (process.env.JWT).trim()
    )
    return 'Bearer '+token
}

export const User = model('user',userSchema)
