import { Item } from "../models/item.model.js";
import cloudinary from "../utils/cloudinary.js";
import lodash from "lodash";
const { pick } = lodash;



export const registerItem = async (req, res, next) => {
    try {
        let item = new Item(
          pick(req.body, [
            "title",
            "description"
          ])
        );

        console.log("thumbnail", req.file)

        let docInfo = await cloudinary.uploader.upload(req.file.path)
        let secure_url = docInfo.secure_url
        let cloudinaryId = docInfo.public_id
        let itemPicture = {
            itemPictureUrl: secure_url,
            itemPictureId: cloudinaryId
          }

      item.thumbnail = itemPicture.itemPictureUrl
      item.thumbnail_cloudinary_id = itemPicture.itemPictureId
    
          await item.save();
          return res.status(201).send({
            success: true,
            message:
              "Item Registered successfully",
          });
    } catch (ex) {
      console.log("error", ex)
        res.status(400).send({message: ex.message});
      }
};

export const getItems = async (req, res, next) => {
    try {

        const items = await Item.find()
        return res.send({
            data: items,
            status: 200
        })

    } catch (e) {
        return res.json({
            message: "An error occured,try again",
            status: 500
        })
    }
}

export const searchItems = async (req, res, next) => {
  try {
      const searchKey = req.query.key
      const items = await Item.find({
        $or: [{'title':{$regex: searchKey, $options: 'i'}},{"description":{$regex:searchKey, $options: 'i'}}]
    })
      return res.send({
          data: items,
          status: 200
      })

  } catch (e) {
      return res.json({
          message: "An error occured,try again",
          status: 500
      })
  }
}
