import { Router } from 'express'
import { coachRouter } from './coach'
import { planRouter } from './plan'
import {contentRouter} from './content'

export const router = Router()

router.use(coachRouter)
router.use(planRouter)
router.use(contentRouter)
