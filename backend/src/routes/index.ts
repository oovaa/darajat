import { Router } from 'express'
import { coachRouter } from './coach'

export const router = Router()

router.use('/api', coachRouter)
