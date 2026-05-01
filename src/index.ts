import 'dotenv/config';
import express, { Express } from 'express';
import path from 'path';
import './config.js'; // do not remove this line
import { requireAdmin, requireAuth, sessionMiddleware } from './sessionConfig.js';

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
const frontendDir = path.join(process.cwd(), 'frontend', 'build');
//const PostgresStore = connectPgSimple(session);

app.use(sessionMiddleware); // Setup session management middleware
app.use(express.json()); // Setup JSON body parsing middleware
app.use(express.urlencoded({ extended: false })); // Setup urlencoded (HTML Forms) body parsing middleware

// Setup static resource file middleware
// This allows the client to access any file inside the `public` directory
// Only put file that you actually want to be publicly accessibly in the `public` folder
app.use(express.static('public', { extensions: ['html'] }));
app.use(express.static(frontendDir, { extensions: ['html'] }));
app.use(express.static('frontend/build'));
// -- Routes --------------------------------------------------

//user stuffs
app.post('/api/register', registerUser);
app.post('/api/login', logIn);
app.get('/api/profile', requireAuth, getProfile);
app.put('/api/profile', requireAuth, updateProfile);
app.delete('/api/profile', requireAuth, deleteProfile);
//properties

app.get('/api/properties', requireAuth, getProperties);
app.get('/api/properties/:propertyId', requireAuth, getProperty);
app.post('/api/properties', requireAuth, requireAdmin, registerProperty);
app.put('/api/properties/:propertyId', requireAuth, requireAdmin, editProperty);
app.delete('/api/properties/:propertyId', requireAuth, requireAdmin, removeProperty);

//muh tenants

app.get('/api/tenants', requireAuth, getTenants);
app.get('/api/tenants/:tenantId', requireAuth, getTenant);
app.post('/api/tenants', requireAuth, requireAdmin, addTenant);
app.put('/api/tenants/:tenantId', requireAuth, requireAdmin, editTenant);
app.delete('/api/tenants/:tenantId', requireAuth, requireAdmin, removeTenant);

//muh leases

app.get('/api/properties/:propertyId/leases', requireAuth, listLeasesForProperty);
app.get('/api/leases/:leaseId', requireAuth, getLease);
app.post('/api/properties/:propertyId/leases', requireAuth, requireAdmin, addLease);
app.put('/api/leases/:leaseId', requireAuth, requireAdmin, editLease);
app.delete('/api/leases/:leaseId', requireAuth, requireAdmin, removeLease);

//rent payment

app.get('/api/leases/:leaseId/payments', requireAuth, listRentPayments);
app.get('/api/payments/:paymentId', requireAuth, getRentPayment);
app.post('/api/leases/:leaseId/payments', requireAuth, addRentPayment);
app.put('/api/payments/:paymentId', requireAuth, requireAdmin, editRentPayment);

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

app.get('/api/me', (req, res) => {
  if (!req.session.isLoggedIn || !req.session.authenticatedUser) {
    res.sendStatus(401);
    return;
  }

  const { userId, email, displayName } = req.session.authenticatedUser;
  res.json({ id: userId, email, displayName });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
