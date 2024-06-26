import express from 'express';
import {login} from '../services/owner/access/login'
import {signup} from '../services/owner/access/signup'
import {createApi, getAllApi} from '../services/owner/xApiKeys/index'
import authentication from '../lib/auth/authentication';
import { RoleCode } from '../models/Role';
import role from '../helper/role'
import {createTrip, getAllTripsOwner, getSingleTripAdmin} from '../services/owner/trip/index'
import { allOwners, singleOwner} from '../services/owner/users/owner'
import { allAdmins, singleAdmin, verifyAdmins} from '../services/owner/users/admin'
import { getAllUsers, getUser, updateUser} from '../services/owner/users/client'
import {createCompany} from '../services/owner/company/index'
import {createCollection, getAllCollections} from '../services/owner/collections/index'
import {bookTicketManual, fetchTripTicket} from '../services/owner/ticket/index'
import {fetchTopTrending, fetchTopTrendingLocations, handleAddCollections, handleAddLocations, handleDeleteCollection, handleDeleteLocation} from '../services/owner/Manual/TopTrending'
const router = express.Router();



// Access
router.post('/login', login);
router.post('/signup',  signup);




router.use('/',  role(RoleCode.OWNER),authentication)





// User

router.get('/owner',singleOwner );
router.get('/allOwners',allOwners );

router.get('/admin',singleAdmin );
router.get('/allAdmins',allAdmins );
router.post('/verifyAdmin',  verifyAdmins );

router.get('/user',getUser );
router.get('/allUsers',getAllUsers);
router.put('/user',updateUser);




// X-APi
router.post('/xApi',  createApi);
router.get('/xApi', getAllApi);



// Trips

router.post('/trip', createTrip);
router.get('/trips',  getAllTripsOwner);
router.get('/trip',  getSingleTripAdmin);


// Collections

router.post('/collection',  createCollection);
router.get('/collections',  getAllCollections);


// Working Trip

router.post('/WorkingTrip',  createTrip);


//  Company

router.post('/company',  createCompany);



// Ticket

router.post('/bookTicket',  bookTicketManual);
router.post('/tripTicket',  fetchTripTicket);



//  Manual Top Trending

router.post('/addLocations', handleAddLocations);
router.post('/addCollections', handleAddCollections);
router.post('/deleteCollection', handleDeleteCollection);
router.post('/deleteLocation', handleDeleteLocation);
router.get('/topTrending', fetchTopTrending);
router.get('/topTrendingLocations', fetchTopTrendingLocations);





export default router