import Joi from "joi";
import _ from "lodash";
import { CarOwner } from "../models/carOwner.model.js";
import { Vehicle } from "../models/vehicle.model.js";

export async function validateVehicleRegistration(req, res, next) {
    try {
        const schema = Joi.object({
            chasisNumber: Joi.string().required(),
            plateNumber: Joi.string().required(),
            company: Joi.string().required(),
            year: Joi.number().required(),
            price: Joi.number().required(),
            model: Joi.string().required()
        })
        const { error } = schema.validate(_.pick(req.body,  [
            "chasisNumber",
            "plateNumber",
            "company",
            "year",
            "price",
            "model"
        ]));
        if (error) {
            return res.status(400).json({
                error: error.message,
                message: "Unable to register vehicle."
            })
        }
        let existingVehicle = await Vehicle.findOne({ plateNumber: req.body.plateNumber, chasisNumber: req.body.chasisNumber })
        if (existingVehicle) return res.status(400).send("Vehicle is already registered!")

        return next()
    }
    catch (ex) {
        return res.status(400).send(ex.message)
    }
}

export async function validateAssignOwner(req, res, next) {
    try {
        let existingOwner = await CarOwner.findOne({ _id: req.body.owner })
        if (!existingOwner)
            return res.status(404).json({message: "Owner does not exist!"})
        
        let existingAssignement = await Vehicle.findOne({ ownerId: req.body.owner, _id: req.params.vehicleId })
        if (existingAssignement) 
            return res.status(404).json({message: "Vehicle with number "+existingAssignement.plateNumber+ " has an owner"})
        
        return next()
    } catch (ex) {
        return res.status(400).send(ex.message)
    }
}