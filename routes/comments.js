import { Router } from "express";
import * as commentsCtrl from "../controllers/comments.js"

const router = Router()

router.post('/:id', commentsCtrl.create)