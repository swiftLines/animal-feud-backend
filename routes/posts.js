import { Router } from "express";
import * as postsCtrl from '../controllers/posts.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

router.use(decodeUserFromToken)

router.get('/', checkAuth, postsCtrl.index)

router.get('/:id', checkAuth, postsCtrl.show)

router.post('/', checkAuth, postsCtrl.create)

router.put('/:id', checkAuth, postsCtrl.update)

router.post('/:id/evidence', checkAuth, postsCtrl.createEvidence)

router.post('/:postId/comments', checkAuth, postsCtrl.addComment)

router.delete('/:id', checkAuth, postsCtrl.delete)

export{router}

