import express from 'express';
import apiKey from '../lib/auth/apikey'
import logout from '../services/admin/access/logout'
import tokenRefresh from '../services/admin/access/token'
import {login} from '../services/admin/access/login'
import {checkOtpEmail, checkOtpPhone, getOtpEmail, getOtpPhone, signup} from '../services/admin/access/signup'
import { RoleCode } from '../models/Role';
import role from '../helper/role'
import {createTrip, createWorkingTrip, deleteTrips, fetchWorkingTrip, getAllTrips, getSingleTrip, getTripPricePlan, publishTrip, updateTrip} from '../services/admin/trip/index'
import authentication from '../lib/auth/authentication';
import {bookTicketManual, fetchTripTicket} from '../services/admin/ticket/index'
import {fetchNameLogoPlan, getCompanyInfo} from '../services/admin/company'
import {getAllCollections} from '../services/admin/collection'
import {getAdminInfo, updateAdminInfo} from '../services/admin/adminInfo'

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
router.put('/trip', updateTrip);
router.get('/trips',  getAllTrips);
router.get('/trip',  getSingleTrip);
router.post('/deleteTrips',  deleteTrips);
router.post('/publishTrips', publishTrip);
router.get('/tripPricePlans', getTripPricePlan);




// Working Trip

router.post('/workingTrip',  createWorkingTrip);
router.get('/workingTrip',  fetchWorkingTrip);


// Ticket

router.post('/bookTicket',  bookTicketManual);
router.post('/tripTicket',  fetchTripTicket);


// Company

router.get('/companyNLP',fetchNameLogoPlan);   // Fetch Company name logo and plan
router.get('/companyInfo',getCompanyInfo);   


// Collections

router.get('/collections',getAllCollections);


// admin
router.get('/admin',getAdminInfo);  
router.post('/admin',updateAdminInfo);  



export default router