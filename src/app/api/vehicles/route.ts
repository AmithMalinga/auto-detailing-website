import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');

    const vehicles = await prisma.vehicle.findMany({
      where: customerId ? { customerId } : undefined,
      include: { customer: true },
    });
    
    return NextResponse.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return NextResponse.json({ error: 'Failed to fetch vehicles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.make || !body.model || !body.year || !body.color || !body.vehicleType || !body.customerId) {
      return NextResponse.json({ error: 'Missing required vehicle fields' }, { status: 400 });
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        make: body.make,
        model: body.model,
        year: body.year,
        color: body.color,
        vehicleType: body.vehicleType,
        plateNumber: body.plateNumber,
        customerId: body.customerId, // Foreign key linking to Customer
      },
    });

    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    console.error('Error creating vehicle:', error);
    return NextResponse.json({ error: 'Failed to create vehicle' }, { status: 500 });
  }
}
