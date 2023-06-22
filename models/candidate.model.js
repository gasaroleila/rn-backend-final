import { model, Schema } from "mongoose";

const candidateSchema = new Schema(
  {
    names: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    missionStatement: {
      type: String,
      required: true,
    },
    nationalId: {
      type: String,
      minLength: 16,
      unique: true,
      required: true,
    },

    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/code-ama/image/upload/v1631563998/defaultProfile_tslvta.jpg",
    },
    profilePicture_cloudinary_id: {
      type: String,
      default: "",
    },

    votes: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);

export const Candidate = model("candidate", candidateSchema);
