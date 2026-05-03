import 'dotenv/config';
import express, { Express } from 'express';
import path from 'path';
import './config.js'; // do not remove this line
import {
  deleteProfile,
  getProfile,
  logIn,
  registerUser,
  updateProfile,
} from './controllers/UserController.js';
import { requireAdmin, requireAuth, sessionMiddleware } from './sessionConfig.js';
import { uploadLeaseDoc, uploadPhoto } from './uploadConfig.js';

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
  uploadPropertyImage,
} from './controllers/PropertyController.js';

import {
  addTenant,
  editTenant,
  getTenant,
  getTenants,
  removeTenant,
} from './controllers/TenantController.js';

import { ErrorRequestHandler } from 'express';
import multer from 'multer';
import {
  addLease,
  editLease,
  getLease,
  listLeasesForProperty,
  removeLease,
  uploadLease,
} from './controllers/LeaseController.js';

const uploadErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(413).json({ error: 'File too large (max 2 MB)' });
      return;
    }
    res.status(400).json({ error: err.message });
    return;
  }
  next(err); // not a multer error, pass it on
};

const app: Express = express();
app.set('trust proxy', 1);
app.use(uploadErrorHandler);
const { PORT } = process.env;
const frontendDir = path.join(process.cwd(), 'frontend', 'build');
//const PostgresStore = connectPgSimple(session);

app.use(sessionMiddleware); // Setup session management middleware
app.use(express.json()); // Setup JSON body parsing middleware
app.use(express.urlencoded({ extended: false })); // Setup urlencoded (HTML Forms) body parsing middleware
app.use('/uploads', express.static('uploads'));
// Setup static resource file middleware
// This allows the client to access any file inside the `public` directory
// Only put file that you actually want to be publicly accessibly in the `public` folder
app.use(express.static('public', { extensions: ['html'] }));
//app.use(express.static(frontendDir, { extensions: ['html'] }));
app.use(express.static('frontend/build'));
// -- Routes --------------------------------------------------

//user stuffs
app.post('/api/register', registerUser);
app.post('/api/login', logIn);
app.get('/api/profile', requireAuth, getProfile);
app.put('/api/profile', requireAuth, updateProfile);
app.delete('/api/profile', requireAuth, deleteProfile);

//uploading
app.post(
  '/api/leases/:leaseId/pdf',
  requireAuth,
  requireAdmin,
  uploadLeaseDoc.single('leasePdf'),
  uploadLease,
);

app.get('/api/me', (req, res) => {
  if (!req.session.isLoggedIn || !req.session.authenticatedUser) {
    res.sendStatus(401);
    return;
  }

  const { userId, email, displayName, role } = req.session.authenticatedUser;
  res.json({ id: userId, email, displayName, role });
});

//properties
app.get('/api/properties', requireAuth, getProperties);
app.get('/api/properties/:propertyId', requireAuth, getProperty);
app.post('/api/properties', requireAuth, requireAdmin, registerProperty);
app.put('/api/properties/:propertyId', requireAuth, requireAdmin, editProperty);
app.delete('/api/properties/:propertyId', requireAuth, requireAdmin, removeProperty);

app.post(
  '/api/properties/:propertyId/img',
  requireAuth,
  requireAdmin,
  uploadPhoto.single('propertyImg'),
  uploadPropertyImage,
);

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

//app.get(/.*/, (req, res) => {
//  res.sendFile(path.join(frontendDir, 'index.html'));
//});

app.get(/^\/(?!api(?:\/|$)).*/, (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
