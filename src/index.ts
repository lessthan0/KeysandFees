import connectPgSimple from 'connect-pg-simple';
import 'dotenv/config';
import express, { Express } from 'express';
import session from 'express-session';
import './config.js'; // do not remove this line
import { sessionMiddleware } from './sessionConfig.js';
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
const { PORT, COOKIE_SECRET } = process.env;
const PostgresStore = connectPgSimple(session);

app.use(sessionMiddleware); // Setup session management middleware
app.use(express.json()); // Setup JSON body parsing middleware
app.use(express.urlencoded({ extended: false })); // Setup urlencoded (HTML Forms) body parsing middleware

// Setup static resource file middleware
// This allows the client to access any file inside the `public` directory
// Only put file that you actually want to be publicly accessibly in the `public` folder
app.use(express.static('public', { extensions: ['html'] }));
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
// -- Routes --------------------------------------------------
// Register your routes below this line

//test
app.get('/', (req, res) => {
  res.send('API is running');
});

//user stuffs
app.post('/register', registerUser);
app.post('/login', logIn);
app.get('/profile', getProfile);
app.put('/profile', updateProfile);
app.delete('/profile', deleteProfile);
//properties
import {
  editProperty,
  getProperties,
  getProperty,
  registerProperty,
  removeProperty,
} from './controllers/PropertyController.js';
app.get('/properties', getProperties);
app.get('/properties/:propertyId', getProperty);
app.post('/properties', registerProperty);
app.put('/properties/:propertyId', editProperty);
app.delete('/properties/:propertyId', removeProperty);

//muh tenants
import {
  addTenant,
  editTenant,
  getTenant,
  getTenants,
  removeTenant,
} from './controllers/TenantController.js';
app.get('/tenants', getTenants);
app.get('/tenants/:tenantId', getTenant);
app.post('/tenants', addTenant);
app.put('/tenants/:tenantId', editTenant);
app.delete('/tenants/:tenantId', removeTenant);

//muh leases
import {
  addLease,
  editLease,
  getLease,
  listLeasesForProperty,
  removeLease,
} from './controllers/LeaseController.js';

app.get('/properties/:propertyId/leases', listLeasesForProperty);
app.get('/leases/:leaseId', getLease);
app.post('/properties/:propertyId/leases', addLease);
app.put('/leases/:leaseId', editLease);
app.delete('/leases/:leaseId', removeLease);

//rent payment
import {
  addRentPayment,
  editRentPayment,
  getRentPayment,
  listRentPayments,
} from './controllers/RentPaymentController.js';

app.get('/leases/:leaseId/payments', listRentPayments);
app.get('/payments/:paymentId', getRentPayment);
app.post('/leases/:leaseId/payments', addRentPayment);
app.put('/payments/:paymentId', editRentPayment);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
