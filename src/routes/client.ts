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
import {addFavouriteTrip, removeFavouriteTrip, searchTrip, searchTripByCollection,getAllPublishedTrips, getSingleTrip} from '../services/client/trip/index'
import {getAllCollectionsNames} from '../services/client/collection/index'

const router = express.Router();



router.post('/getOtpPhone', getOtpPhone);
router.post('/verifyOtpPhone', checkOtpPhone);

// router.use('/', role(RoleCode.CLIENT),authentication)  

// Access
router.get('/user', getUser);
router.put('/user', updateUser);


// Book Ticket
router.post('/bookTrip', bookTicket);
router.get('/ticket', fetchUsersTicket);


// favourite Trip

router.post('/addFavouriteTrip', addFavouriteTrip);
router.post('/removeFavouriteTrip', removeFavouriteTrip);

// Search Trip

router.get('/search', searchTrip);
router.get('/tripByCollection', searchTripByCollection);
router.get('/trip', getSingleTrip);


// fetch All Trips

router.get('/trips', getAllPublishedTrips);
router.get('/collNames', getAllCollectionsNames);

//Collection



export default router