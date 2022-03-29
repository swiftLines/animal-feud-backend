import { Router } from "express";
import * as postsCtrl from '../controllers/posts.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', postsCtrl.index)

router.get('/:id', postsCtrl.show)

router.use(decodeUserFromToken)

router.post('/', checkAuth, postsCtrl.create)

router.put('/:id', checkAuth, postsCtrl.update)

router.post('/:id/evidence', checkAuth, postsCtrl.createEvidence)

router.delete('/:id', checkAuth, postsCtrl.delete)

export{router}

