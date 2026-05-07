import type { Request } from 'express';
import type { FileFilterCallback } from 'multer';
import multer from 'multer';
import path from 'path';
import { v7 as uuidv7 } from 'uuid';

const LEASE_DIR = 'uploads/lease';
const PHOTOS_DIR = 'uploads/photos';
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'application/pdf'];

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Received upload fieldname:', file.fieldname);
    if (file.fieldname === 'leasePdf') {
      cb(null, LEASE_DIR);
      return;
    }

    // Accept 'propertyImg' as the field name for property image uploads
    if (file.fieldname === 'propertyImg') {
      cb(null, PHOTOS_DIR);
      return;
    }

    cb(new Error('Invalid upload field: ' + file.fieldname), undefined);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uuidv7()}${ext}`);
  },
});

const LeaseFileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true); // accept
  } else {
    cb(null, false); // reject silently — handled in the controller
  }
};
const PhotoFileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true); // accept
  } else {
    cb(null, false); // reject silently — handled in the controller
  }
};

const uploadLeaseDoc = multer({
  storage: Storage,
  fileFilter: LeaseFileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});

const uploadPhoto = multer({
  storage: Storage,
  fileFilter: PhotoFileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});

export { uploadLeaseDoc, uploadPhoto };
