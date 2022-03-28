import { Router } from "express";
import * as postsCtrl from '../controllers/posts.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()


router.get('/', postsCtrl.index)

router.get('/:id', postsCtrl.show)

router.use(decodeUserFromToken)

router.post('/', checkAuth, postsCtrl.create)

router.delete('/:id', postsCtrl.delete)

export{router}

