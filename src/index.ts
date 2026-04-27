import 'dotenv/config';
import express, { Express } from 'express';
import './config.js'; // do not remove this line
import { requireAuth } from './sessionConfig.js';
//import { RegistrationSchema } from './authValidator.ts';
//import { CreateLeaseSchema, UpdateLeaseSchema } from './validators/leaseValidators.js';
//import { CreatePropertySchema } from './validators/propertyValidators.js';
//import { CreateRentPaymentSchema } from './validators/rentPaymentValidator.js';
//import { CreateTenantSchema } from './validators/tenantValidator.js';
import {
  deleteProfile,
  getProfile,
  logIn,
  registerUser,
  updateProfile,
} from './controllers/UserController.js';
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
/*
app.use(
  session({
    store: new PostgresStore({ createTableIfMissing: true }),
    secret: COOKIE_SECRET, // Signs the cookie so clients can't forge it
    cookie: { maxAge: 8 * 60 * 60 * 1000 }, // 8-hour sessions
    name: 'session',
    resave: false, // Don't re-save unchanged sessions
    saveUninitialized: false, // Only create sessions when we write to req.session
  }),
);
*/
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
import {
  editProperty,
  getProperties,
  getProperty,
  registerProperty,
  removeProperty,
} from './controllers/PropertyController.js';
app.get('/properties', requireAuth, getProperties);
app.get('/properties/:propertyId', requireAuth, getProperty);
app.post('/properties', requireAuth, registerProperty);
app.put('/properties/:propertyId', requireAuth, editProperty);
app.delete('/properties/:propertyId', requireAuth, removeProperty);

//muh tenants
import {
  addTenant,
  editTenant,
  getTenant,
  getTenants,
  removeTenant,
} from './controllers/TenantController.js';
app.get('/tenants', requireAuth, getTenants);
app.get('/tenants/:tenantId', requireAuth, getTenant);
app.post('/tenants', requireAuth, addTenant);
app.put('/tenants/:tenantId', requireAuth, editTenant);
app.delete('/tenants/:tenantId', requireAuth, removeTenant);

//muh leases
import {
  addLease,
  editLease,
  getLease,
  listLeasesForProperty,
  removeLease,
} from './controllers/LeaseController.js';

app.get('/properties/:propertyId/leases', requireAuth, listLeasesForProperty);
app.get('/leases/:leaseId', requireAuth, getLease);
app.post('/properties/:propertyId/leases', requireAuth, addLease);
app.put('/leases/:leaseId', requireAuth, editLease);
app.delete('/leases/:leaseId', requireAuth, removeLease);

//rent payment
import {
  addRentPayment,
  editRentPayment,
  getRentPayment,
  listRentPayments,
} from './controllers/RentPaymentController.js';
import { sessionMiddleware } from './sessionConfig.js';

app.get('/leases/:leaseId/payments', requireAuth, listRentPayments);
app.get('/payments/:paymentId', requireAuth, getRentPayment);
app.post('/leases/:leaseId/payments', requireAuth, addRentPayment);
app.put('/payments/:paymentId', requireAuth, editRentPayment);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
