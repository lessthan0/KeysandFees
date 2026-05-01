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
const apiRouter = express.Router();

//test
apiRouter.get('/', (req, res) => {
  res.send('API is running');
});

//user stuffs
apiRouter.post('/register', registerUser);
apiRouter.post('/login', logIn);
apiRouter.get('/profile', requireAuth, getProfile);
apiRouter.put('/profile', requireAuth, updateProfile);
apiRouter.delete('/profile', requireAuth, deleteProfile);
//properties

apiRouter.get('/properties', requireAuth, getProperties);
apiRouter.get('/properties/:propertyId', requireAuth, getProperty);
apiRouter.post('/properties', requireAuth, registerProperty);
apiRouter.put('/properties/:propertyId', requireAuth, editProperty);
apiRouter.delete('/properties/:propertyId', requireAuth, removeProperty);

//muh tenants

apiRouter.get('/tenants', requireAuth, getTenants);
apiRouter.get('/tenants/:tenantId', requireAuth, getTenant);
apiRouter.post('/tenants', requireAuth, addTenant);
apiRouter.put('/tenants/:tenantId', requireAuth, editTenant);
apiRouter.delete('/tenants/:tenantId', requireAuth, removeTenant);

//muh leases

apiRouter.get('/properties/:propertyId/leases', requireAuth, listLeasesForProperty);
apiRouter.get('/leases/:leaseId', requireAuth, getLease);
apiRouter.post('/properties/:propertyId/leases', requireAuth, addLease);
apiRouter.put('/leases/:leaseId', requireAuth, editLease);
apiRouter.delete('/leases/:leaseId', requireAuth, removeLease);

//rent payment

apiRouter.get('/leases/:leaseId/payments', requireAuth, listRentPayments);
apiRouter.get('/payments/:paymentId', requireAuth, getRentPayment);
apiRouter.post('/leases/:leaseId/payments', requireAuth, addRentPayment);
apiRouter.put('/payments/:paymentId', requireAuth, editRentPayment);

app.use('/api', apiRouter);

// Serve the SvelteKit frontend in production
app.use(express.static('frontend/build'));

// Catch-all route to serve the frontend's index.html for SPA routing
app.use((req, res) => {
  res.sendFile('index.html', { root: 'frontend/build' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
