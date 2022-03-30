import { Router } from "express";
import * as commentsCtrl from "../controllers/comments.js"

const router = Router()

router.post('/:postId', commentsCtrl.create)

export{router}