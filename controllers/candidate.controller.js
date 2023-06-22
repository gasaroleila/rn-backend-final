import lodash from "lodash";
import { Candidate } from "../models/candidate.model.js";
import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
const { pick } = lodash;


export const registerCandidate = async(req,res,next) => {
    try {
        let candidate = new Candidate(
          pick(req.body, [
            "names",
            "nationalId",
            "profilePicture",
            "gender",
            "missionStatement"
          ])
        );

        let docInfo = await cloudinary.uploader.upload(req.file.path)
    let secure_url = docInfo.secure_url
    let cloudinaryId = docInfo.public_id
    let profilePicture = {
        profilePictureUrl: secure_url,
        profilePictureId: cloudinaryId
      }

   candidate.profilePicture = profilePicture.profilePictureUrl
  candidate.profilePicture_cloudinary_id = profilePicture.profilePictureId
    
          await candidate.save();
          return res.status(201).send({
            success: true,
            message:
              "Candidate Registered successfully",
          });
      } catch (ex) {
        res.status(400).send({message: ex.message});
      }
};

export const getCandidates = async (req, res, next) => {
    try {

        const candidates = await Candidate.find()
        return res.send({
            data: candidates,
            status: 200
        })

    } catch (e) {
        return res.json({
            message: "An error occured,try again",
            status: 500
        })
    }
}

export const voteCandidate = async (req, res) => {
  try {
    let existingCandidate = await Candidate.findOne({
      _id: req.params.candidateId,
    });

    await Candidate.findOneAndUpdate(
      { _id: req.params.candidateId },
      { votes: existingCandidate.votes + 1 }
    );

    await User.findOneAndUpdate({ _id: req.user.data._id }, { hasVoted: true })
    return res.send({
     success: true,
     status: 204
  })
  } catch (e) {
    res.status(500).send("Server Error!");
  }
};
    