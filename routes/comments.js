import { Router } from "express";
import * as commentsCtrl from "../controllers/comments.js"
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()


router.post('/:postId', commentsCtrl.create)

router.get('/', commentsCtrl.new)

router.use(decodeUserFromToken)



export{router}