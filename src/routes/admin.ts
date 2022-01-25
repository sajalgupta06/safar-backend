import express from 'express';
import apiKey from '../lib/auth/apikey'
import logout from '../services/admin/access/logout'
import tokenRefresh from '../services/admin/access/token'
import {login} from '../services/admin/access/login'
import {checkOtpEmail, checkOtpPhone, getOtpEmail, getOtpPhone, signup} from '../services/admin/access/signup'
import { RoleCode } from '../models/Role';
import role from '../helper/role'
import {createTrip, createWorkingTrip, getAllTrips, getSingleTrip} from '../services/admin/trip/index'
import authentication from '../lib/auth/authentication';
import {bookTicketManual, fetchTripTicket} from '../services/admin/ticket/index'

const router = express.Router();





// Access
router.post('/getOtpPhone', getOtpPhone);
router.post('/verifyOtpPhone', checkOtpPhone);
router.post('/getOtpEmail', getOtpEmail);
router.post('/verifyOtpEmail', checkOtpEmail);
router.post('/signup', signup);
router.post('/login', login);


router.use('/',role(RoleCode.ADMIN),authentication )

// Trips

router.post('/trip', createTrip);
router.get('/trips',  getAllTrips);
router.get('/trip',  getSingleTrip);


// Working Trip

router.post('/workingTrip',  createWorkingTrip);


// Ticket

router.post('/bookTicket',  bookTicketManual);
router.post('/tripTicket',  fetchTripTicket);



export default router