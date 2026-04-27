import { Request, Response } from 'express';
//import { AppDataSource } from '../dataSource.js';
//import { RentPayment } from '../entities/RentPayments.js';

import {
  CreateRentPaymentSchema,
  UpdateRentPaymentSchema,
} from '../validators/rentPaymentValidator.js';

import {
  createRentPayment,
  getPaymentById,
  getPaymentsForLease,
  updateRentPayment,
} from '../models/RentPaymentModel.js';

//export const PaymentRepository = AppDataSource.getRepository(RentPayment);

export async function listRentPayments(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.session.authenticatedUser?.userId;

    if (!userId) {
      res.sendStatus(401);
      return;
    }

    const { leaseId } = req.params;

    const payments = await getPaymentsForLease(userId, leaseId);

    res.status(200).json(payments);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function getRentPayment(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.session.authenticatedUser?.userId;

    if (!userId) {
      res.sendStatus(401);
      return;
    }

    const { paymentId } = req.params;

    const payment = await getPaymentById(userId, paymentId);

    if (!payment) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json(payment);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function addRentPayment(req: Request, res: Response): Promise<void> {
  const result = CreateRentPaymentSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  try {
    const userId = req.session.authenticatedUser?.userId;

    if (!userId) {
      res.sendStatus(401);
      return;
    }

    const { leaseId } = req.params;

    const payment = await createRentPayment(userId, leaseId, result.data);

    if (!payment) {
      res.status(404).json({
        message: 'Lease not found',
      });
      return;
    }

    res.status(201).json(payment);
  } catch (err) {
    console.error(err);

    if (err instanceof Error && err.message === 'DUPLICATE_RENT_MONTH') {
      res.status(400).json({
        message: 'Rent has already been paid for this month',
      });
      return;
    }

    res.sendStatus(500);
  }
}

export async function editRentPayment(req: Request, res: Response): Promise<void> {
  const result = UpdateRentPaymentSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  try {
    const userId = req.session.authenticatedUser?.userId;

    if (!userId) {
      res.sendStatus(401);
      return;
    }

    const { paymentId } = req.params;

    const payment = await updateRentPayment(userId, paymentId, result.data);

    if (!payment) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json(payment);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
