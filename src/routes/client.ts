import express from 'express';
import apiKey from '../lib/auth/apikey'
import logout from '../services/client/access/logout'
import tokenRefresh from '../services/client/access/token'
import {checkOtpPhone, getOtpPhone, } from '../services/client/access/login'
import {getUser, updateUser, uploadProfilePicture } from '../services/client/user/index'
import authentication from '../lib/auth/authentication';
import { RoleCode } from '../models/Role';
import role from '../helper/role'
import {bookTicket, fetchUsersTicket} from '../services/client/ticket/index'
import {addFavouriteTrip, removeFavouriteTrip, searchTrip, searchTripByCollection,getAllPublishedTrips, getSingleTrip, getMultipleTrips, getSingleTripBySlug} from '../services/client/trip/index'
import {getAllCollection, getAllCollectionsNames, getSingleCollection} from '../services/client/collection/index'
import {getTrendingLocations} from '../services/client/trending/index'
import{ApiEndpoint} from '../helper/ApiEndpoint'
import {getOrderId, verifyOrder} from '../services/client/payment/index'

const router = express.Router();



router.post(`/${ApiEndpoint.GENERATE_PHONE_OTP}`, getOtpPhone);
router.post(`/${ApiEndpoint.VERIFY_PHONE_OTP}`, checkOtpPhone);

// router.use('/', role(RoleCode.CLIENT),authentication)  

// Access
router.get(`/${ApiEndpoint.FETCH_USER}`, role(RoleCode.CLIENT),authentication, getUser);
router.post(`/${ApiEndpoint.UPDATE_USER}`,  role(RoleCode.CLIENT),authentication,updateUser);
// router.put('/user', updateUser);


// Book Ticket  
router.post(`/${ApiEndpoint.BOOK_TICKET}`, role(RoleCode.CLIENT),authentication, bookTicket);
router.get(`/${ApiEndpoint.FETCH_USERS_TICKET}`,role(RoleCode.CLIENT),authentication, fetchUsersTicket);


// favourite Trip

router.post(`/${ApiEndpoint.ADD_TRIP_TO_FAVOURITES}`,  role(RoleCode.CLIENT),authentication,addFavouriteTrip);
router.post(`/${ApiEndpoint.REMOVE_TRIP_FROM_FAVOURITES}`,role(RoleCode.CLIENT),authentication, removeFavouriteTrip);

// Search Triprun 

router.get(`/${ApiEndpoint.FETCH_SEARCH_TRIPS_NAME_SLUG_FINALPRICE}`, searchTrip);
router.get('/tripByCollection/:slug', searchTripByCollection);
router.get( `/${ApiEndpoint.FETCH_FULL_TRIP_DETAILS}/:slug` , getSingleTripBySlug);
router.get('/trip', getSingleTrip);


// fetch All Trips

router.get(`/${ApiEndpoint.FETCH_POPULAR_TRIPS_NAME_SLUG_FINALPRICE}`, getAllPublishedTrips);

router.get('/collNames', getAllCollectionsNames);

//Fetch Multiple Trips

router.post('/trips', getMultipleTrips);


//Collection
router.get('/collections', getAllCollection);
router.get('/collection/:slug', getSingleCollection);



// Upload Image
router.put('/image', uploadProfilePicture);



// Trending

router.get('/topTrendingLocations', getTrendingLocations);




//Payment

router.use('/', role(RoleCode.CLIENT),authentication)  

router.post('/getpaymentorderid', getOrderId);
router.post('/verifypayment', verifyOrder);



export default router