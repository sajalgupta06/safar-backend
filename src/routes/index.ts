import express from 'express';
import apiKey from '../lib/auth/apikey'
import ownerRoutes from './owner'
import adminRoutes from './admin'
import clientRoutes from './client'


const router = express.Router();


// router.use('/', apiKey);



// Customer
router.use('/public',clientRoutes)


// Admin
router.use('/admin',adminRoutes)


// Owner
router.use('/private',ownerRoutes)




export default router