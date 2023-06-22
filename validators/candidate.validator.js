import Joi from "joi";
import _ from "lodash";
import { Candidate } from "../models/candidate.model.js";
import { User } from "../models/user.model.js";

export async function validateCandidateRegistration(req, res, next) {
    try {
        const schema = Joi.object({
            names: Joi.string().required(),
            nationalId: Joi.string().length(16).required(),
            gender: Joi.string().required(),
            missionStatement: Joi.string().required()
        })
        const { error } = schema.validate(_.pick(req.body,  [
            "names",
            "nationalId",
            "gender",
            "missionStatement"
        ]));
        if (error) {
            return res.status(400).json({
                error: error.message,
                message: "Unable to register candidate."
            })
        }
        let existingCandidate = await Candidate.find({ nationalId: req.body.nationalId })
           if (existingCandidate) return res.status(400).send({message: "Candidate is already registered!"})

        return next()
    }
    catch (ex) {
        return res.status(400).send(ex.message)
    }
}

export async function validateUserVoting(req, res, next) {
    try {
        let loggedInUser = await User.findOne({ _id: req.user.data._id })
        console.log("loggedInUser", loggedInUser)
        if (loggedInUser.hasVoted) {
            return res.status(400).send({
                message: "You have already voted!"
            }) 
        }

        return next()

    } catch (e) {
        return res.status(500).send(ex.message)
    }
}
