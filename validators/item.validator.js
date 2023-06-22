import Joi from "joi";
import _ from "lodash";
import { Candidate } from "../models/candidate.model.js";
import { Item } from "../models/item.model.js";
import { User } from "../models/user.model.js";

export async function validateItemRegistration(req, res, next) {
    try {
        const schema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required()
        })
        const { error } = schema.validate(_.pick(req.body,  [
            "title",
            "description"
        ]));
        if (error) {
            return res.status(400).json({
                error: error.message,
                message: "Unable to register item."
            })
        }
        // let existingItem = await Item.findOne({ title: req.body.title })
        //    if (existingItem) return res.status(400).send("Item is already registered!")

        return next()
    }
    catch (ex) {
        return res.status(400).send(ex.message)
    }
}