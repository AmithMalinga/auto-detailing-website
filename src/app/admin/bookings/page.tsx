import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic'; // Ensure we always fetch the latest bookings

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    include: {
      customer: true,
      vehicle: true,
    },
    orderBy: {
      scheduledAt: 'desc',
    },
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold font-monument uppercase mb-8 text-white">
          Manage <span className="text-red-600">Appointments</span>
        </h1>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-950 border-b border-neutral-800 text-neutral-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Ref & Status</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Vehicle</th>
                  <th className="px-6 py-4 font-medium">Service</th>
                  <th className="px-6 py-4 font-medium">Schedule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-neutral-500">
                      No appointments found.
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-neutral-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-mono text-xs text-neutral-300 mb-1">{booking.bookingRef}</div>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                          booking.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-300' :
                          booking.status === 'CONFIRMED' ? 'bg-blue-500/20 text-blue-300' :
                          booking.status === 'COMPLETED' ? 'bg-green-500/20 text-green-300' :
                          booking.status === 'CANCELLED' ? 'bg-red-500/20 text-red-300' :
                          'bg-neutral-500/20 text-neutral-300'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-neutral-200">{booking.customer.name}</div>
                        <div className="text-neutral-500">{booking.customer.phone}</div>
                        {booking.customer.email && <div className="text-neutral-500 text-xs">{booking.customer.email}</div>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-neutral-200">{booking.vehicle.make} {booking.vehicle.model} ({booking.vehicle.year})</div>
                        <div className="text-neutral-500 text-xs">{booking.vehicle.color} • {booking.vehicle.vehicleType}</div>
                        {booking.vehicle.plateNumber && <div className="text-neutral-500 text-xs">Lic: {booking.vehicle.plateNumber}</div>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-neutral-200">{booking.serviceType.replace('_', ' ')}</div>
                        <div className="text-neutral-400 text-xs">{booking.packageName}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-neutral-200">
                          {format(new Date(booking.scheduledAt), 'MMM d, yyyy')}
                        </div>
                        <div className="text-neutral-400 text-xs">
                          {format(new Date(booking.scheduledAt), 'h:mm a')}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
