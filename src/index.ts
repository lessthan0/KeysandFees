import 'dotenv/config';
import express, { Express } from 'express';
import './config.js'; // do not remove this line
import { requireAuth, sessionMiddleware } from './sessionConfig.js';

import {
  deleteProfile,
  getProfile,
  logIn,
  registerUser,
  updateProfile,
} from './controllers/UserController.js';

import {
  addRentPayment,
  editRentPayment,
  getRentPayment,
  listRentPayments,
} from './controllers/RentPaymentController.js';

import {
  editProperty,
  getProperties,
  getProperty,
  registerProperty,
  removeProperty,
} from './controllers/PropertyController.js';

import {
  addTenant,
  editTenant,
  getTenant,
  getTenants,
  removeTenant,
} from './controllers/TenantController.js';

import {
  addLease,
  editLease,
  getLease,
  listLeasesForProperty,
  removeLease,
} from './controllers/LeaseController.js';

const app: Express = express();
const { PORT } = process.env;
//const PostgresStore = connectPgSimple(session);

app.use(sessionMiddleware); // Setup session management middleware
app.use(express.json()); // Setup JSON body parsing middleware
app.use(express.urlencoded({ extended: false })); // Setup urlencoded (HTML Forms) body parsing middleware

// Setup static resource file middleware
// This allows the client to access any file inside the `public` directory
// Only put file that you actually want to be publicly accessibly in the `public` folder
app.use(express.static('public', { extensions: ['html'] }));

// -- Routes --------------------------------------------------
// Register your routes below this line

//test
app.get('/', (req, res) => {
  res.send('API is running');
});

//user stuffs
app.post('/register', registerUser);
app.post('/login', logIn);
app.get('/profile', requireAuth, getProfile);
app.put('/profile', requireAuth, updateProfile);
app.delete('/profile', requireAuth, deleteProfile);
//properties

app.get('/properties', requireAuth, getProperties);
app.get('/properties/:propertyId', requireAuth, getProperty);
app.post('/properties', requireAuth, registerProperty);
app.put('/properties/:propertyId', requireAuth, editProperty);
app.delete('/properties/:propertyId', requireAuth, removeProperty);

//muh tenants

app.get('/tenants', requireAuth, getTenants);
app.get('/tenants/:tenantId', requireAuth, getTenant);
app.post('/tenants', requireAuth, addTenant);
app.put('/tenants/:tenantId', requireAuth, editTenant);
app.delete('/tenants/:tenantId', requireAuth, removeTenant);

//muh leases

app.get('/properties/:propertyId/leases', requireAuth, listLeasesForProperty);
app.get('/leases/:leaseId', requireAuth, getLease);
app.post('/properties/:propertyId/leases', requireAuth, addLease);
app.put('/leases/:leaseId', requireAuth, editLease);
app.delete('/leases/:leaseId', requireAuth, removeLease);

//rent payment

app.get('/leases/:leaseId/payments', requireAuth, listRentPayments);
app.get('/payments/:paymentId', requireAuth, getRentPayment);
app.post('/leases/:leaseId/payments', requireAuth, addRentPayment);
app.put('/payments/:paymentId', requireAuth, editRentPayment);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
