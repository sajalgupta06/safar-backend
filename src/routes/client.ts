import express from 'express';
import apiKey from '../lib/auth/apikey'
import logout from '../services/client/access/logout'
import tokenRefresh from '../services/client/access/token'
import {checkOtpPhone, getOtpPhone, } from '../services/client/access/login'
import {getUser, updateUser } from '../services/client/user/index'
import authentication from '../lib/auth/authentication';
import { RoleCode } from '../models/Role';
import role from '../helper/role'
import {bookTicket, fetchUsersTicket} from '../services/client/ticket/index'
import {addFavouriteTrip, removeFavouriteTrip, searchTrip, searchTripByCollection,getAllPublishedTrips, getSingleTrip, getMultipleTrips} from '../services/client/trip/index'
import {getAllCollectionsNames} from '../services/client/collection/index'

const router = express.Router();



router.post('/getOtpPhone', getOtpPhone);
router.post('/verifyOtpPhone', checkOtpPhone);

// router.use('/', role(RoleCode.CLIENT),authentication)  

// Access
router.get('/user', role(RoleCode.CLIENT),authentication, getUser);
router.put('/user',  role(RoleCode.CLIENT),authentication,updateUser);


// Book Ticket  
router.post('/bookTrip', role(RoleCode.CLIENT),authentication, bookTicket);
router.get('/ticket',role(RoleCode.CLIENT),authentication, fetchUsersTicket);


// favourite Trip

router.post('/addFavouriteTrip',  role(RoleCode.CLIENT),authentication,addFavouriteTrip);
router.post('/removeFavouriteTrip',role(RoleCode.CLIENT),authentication, removeFavouriteTrip);

// Search Triprun 

router.post('/search', searchTrip);
router.get('/tripByCollection', searchTripByCollection);
router.get('/trip', getSingleTrip);


// fetch All Trips

router.get('/trips', getAllPublishedTrips);
router.get('/collNames', getAllCollectionsNames);

//Fetch Multiple Trips

router.post('/trips', getMultipleTrips);
//Collection



export default router