import { Vehicle } from "../models/vehicle.model.js";
import lodash from "lodash";
const { pick } = lodash;


export const registerVehicle = async(req,res,next) => {
    try {
        let vehicle = new Vehicle(
          pick(req.body, [
            "chasisNumber",
            "plateNumber",
            "company",
            "year",
            "price",
            "model"
          ])
        );
    
          await vehicle.save();
          return res.status(201).send({
            success: true,
            message:
              "Vehicle Registered successfully",
          });
      } catch (ex) {
        res.status(400).send({message: ex.message});
      }
};

export const getVehicles = async (req, res, next) => {
    try {

        const vehicles = await Vehicle.find()
        return res.send({
            data: vehicles,
            status: 200
        })

    } catch (e) {
        return res.json({
            message: "An error occured,try again",
            status: 500
        })
    }
}

export const assignOwner = async (req, res, next) => {
  try {
    await Vehicle.findOneAndUpdate({ _id: req.params.vehicleId },
      { ownerId: req.body.owner }
    )
    
    return res.json({status: 204,message: "Car Owner added successfully!"})

  } catch (e) {
    return res.json({
      message: "An error occured,try again",
      status: 500
  })
    }
}
    