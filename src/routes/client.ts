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
import {addFavouriteTrip, removeFavouriteTrip, searchTrip, searchTripByCollection} from '../services/client/trip/index'


const router = express.Router();



router.post('/getOtpPhone', getOtpPhone);
router.post('/verifyOtpPhone', checkOtpPhone);

router.use('/', role(RoleCode.CLIENT),authentication)  

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

router.get('/trip', searchTrip);
router.get('/tripByCollection', searchTripByCollection);



export default router