import { z } from 'zod';
import { AppDataSource } from '../dataSource.js';
import { RentPayment } from '../entities/RentPayments.js';
import { LeaseRepository } from '../models/LeaseModel.js';
import {
  CreateRentPaymentSchema,
  UpdateRentPaymentSchema,
} from '../validators/rentPaymentValidator.js';

const PaymentRepository = AppDataSource.getRepository(RentPayment);

async function getPaymentsForLease(userId: string, leaseId: string): Promise<RentPayment[]> {
  try {
    const payments = await PaymentRepository.find({
      where: {
        lease: {
          leaseId,
          property: {
            owner: { userId },
          },
        },
      },
      relations: {
        lease: {
          property: {
            owner: true,
          },
        },
      },
    });

    return payments;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getPaymentById(userId: string, paymentId: string): Promise<RentPayment | null> {
  try {
    const payment = await PaymentRepository.findOne({
      where: {
        paymentId,
        lease: {
          property: {
            owner: { userId },
          },
        },
      },
      relations: {
        lease: {
          property: {
            owner: true,
          },
        },
      },
    });

    return payment;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function createRentPayment(
  userId: string,
  leaseId: string,
  data: z.infer<typeof CreateRentPaymentSchema>,
): Promise<RentPayment | null> {
  try {
    const lease = await LeaseRepository.findOne({
      where: {
        leaseId,
        property: {
          owner: { userId },
        },
      },
      relations: {
        property: {
          owner: true,
        },
      },
    });

    if (!lease) {
      return null;
    }

    const existingPayment = await PaymentRepository.findOne({
      where: {
        lease: { leaseId },
        rentMonth: data.rentMonth,
      },
    });

    if (existingPayment) {
      throw new Error('DUPLICATE_RENT_MONTH');
    }

    const payment = PaymentRepository.create({
      lease,
      rentMonth: data.rentMonth,
      rentAmount: data.rentAmount,
      paidAt: data.paidAt ?? new Date(),
      //late: data.late ?? false,
      //notes: data.notes ?? null,
    });

    const savedPayment = await PaymentRepository.save(payment);

    return savedPayment;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
async function updateRentPayment(
  userId: string,
  paymentId: string,
  data: z.infer<typeof UpdateRentPaymentSchema>,
): Promise<RentPayment | null> {
  try {
    const payment = await PaymentRepository.findOne({
      where: {
        paymentId,
        lease: {
          property: {
            owner: { userId },
          },
        },
      },
      relations: {
        lease: {
          property: {
            owner: true,
          },
        },
      },
    });

    if (!payment) {
      return null;
    }

    if (data.rentAmount !== undefined) {
      payment.rentAmount = data.rentAmount;
    }

    if (data.paidAt !== undefined) {
      payment.paidAt = data.paidAt;
    }

    if (data.late !== undefined) {
      payment.late = data.late;
    }

    if (data.notes !== undefined) {
      payment.notes = data.notes;
    }

    const savedPayment = await PaymentRepository.save(payment);

    return savedPayment;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export { createRentPayment, getPaymentById, getPaymentsForLease, updateRentPayment };
