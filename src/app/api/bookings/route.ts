import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createBookingSchema = z.object({
  serviceType: z.enum(['DETAILING', 'PPF_WRAPPING', 'CAR_TECH', 'DIAGNOSTICS']),
  packageName: z.string(),
  scheduledAt: z.string().datetime(),
  dropOff: z.boolean().optional(),
  customerId: z.string(),
  vehicleId: z.string(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');
    
    const bookings = await prisma.booking.findMany({
      where: customerId ? { customerId } : undefined,
      include: {
        customer: true,
        vehicle: true,
      },
      orderBy: { scheduledAt: 'desc' },
    });
    
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = createBookingSchema.parse(json);

    // Generate a unique booking reference
    const bookingRef = `BKG-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const booking = await prisma.booking.create({
      data: {
        bookingRef,
        serviceType: body.serviceType,
        packageName: body.packageName,
        scheduledAt: new Date(body.scheduledAt),
        dropOff: body.dropOff ?? true,
        customerId: body.customerId,
        vehicleId: body.vehicleId,
        status: 'PENDING',
      },
      include: {
        customer: true,
        vehicle: true,
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
