import express from 'express'
import { getCandidates, registerCandidate, voteCandidate } from '../controllers/candidate.controller.js'
import { validateCandidateRegistration, validateUserVoting } from '../validators/candidate.validator.js'
import authenticate from '../middlewares/auth.middleware.js';
import { uploadFile } from '../utils/fileUpload.utils.js';
const upload = uploadFile()


const router = express.Router()

router.post('/candidate/register', authenticate,upload.single("profilePicture"), validateCandidateRegistration, registerCandidate)
router.get('/candidate/all', authenticate,getCandidates)
router.patch("/candidate/:candidateId/vote",authenticate,validateUserVoting, voteCandidate)

export default router