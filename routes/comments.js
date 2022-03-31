import { Router } from "express";
import * as commentsCtrl from "../controllers/comments.js"
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()




router.use(decodeUserFromToken)

router.post('/:postId', checkAuth, commentsCtrl.create)
router.get('/', checkAuth, commentsCtrl.new)
//router.post('/:postId', checkAuth, commentsCtrl.create)


export{router}