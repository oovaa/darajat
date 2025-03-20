import { Router } from 'express'
import { coachRouter } from './coach'
import { planRouter } from './plan'

export const router = Router()

router.use(coachRouter)
router.use(planRouter)
