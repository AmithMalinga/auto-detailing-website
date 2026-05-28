import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Combined schema for the public submission form
const publicBookingSchema = z.object({
  // Customer Info
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(9, 'Valid phone number is required'),
  email: z.string().email('Valid email is required').optional().or(z.literal('')),
  
  // Vehicle Info
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  color: z.string().min(1, 'Color is required'),
  vehicleType: z.string().min(1, 'Vehicle type is required'),
  plateNumber: z.string().optional(),
  
  // Booking Info
  serviceType: z.enum(['DETAILING', 'PPF_WRAPPING', 'CAR_TECH', 'DIAGNOSTICS']),
  packageName: z.string().min(1, 'Package is required'),
  scheduledAt: z.string().datetime(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = publicBookingSchema.parse(json);

    // Run everything inside an atomic transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Find or Create Customer (using phone number as unique identifier)
      const customer = await tx.customer.upsert({
        where: { phone: data.phone },
        update: { name: data.name, email: data.email },
        create: { name: data.name, phone: data.phone, email: data.email },
      });

      // 2. Create Vehicle for Customer
      const vehicle = await tx.vehicle.create({
        data: {
          make: data.make,
          model: data.model,
          year: data.year,
          color: data.color,
          vehicleType: data.vehicleType,
          plateNumber: data.plateNumber,
          customerId: customer.id,
        },
      });

      // 3. Create Booking
      const bookingRef = `BKG-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const booking = await tx.booking.create({
        data: {
          bookingRef,
          serviceType: data.serviceType,
          packageName: data.packageName,
          scheduledAt: new Date(data.scheduledAt),
          customerId: customer.id,
          vehicleId: vehicle.id,
          status: 'PENDING',
        },
        include: {
          customer: true,
          vehicle: true,
        },
      });

      return booking;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    console.error('Error submitting public booking:', error);
    return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 });
  }
}
