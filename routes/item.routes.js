import express from 'express'
import { getItems, registerItem, searchItems } from '../controllers/item.controller.js';
import authenticate from '../middlewares/auth.middleware.js';
import { uploadFile } from '../utils/fileUpload.utils.js';
import { validateItemRegistration } from '../validators/item.validator.js';
const upload = uploadFile()


const router = express.Router()

router.post('/item/register',upload.single("thumbnail"), validateItemRegistration, registerItem)
router.get('/item/all', authenticate, getItems)
router.get('/item/search', authenticate, searchItems)

export default router