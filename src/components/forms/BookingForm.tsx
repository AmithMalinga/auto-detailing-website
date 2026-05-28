'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Ensure this matches the backend schema requirements
const bookingSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(9, 'Phone is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.coerce.number().min(1950, 'Invalid year').max(new Date().getFullYear() + 1),
  color: z.string().min(1, 'Color is required'),
  vehicleType: z.string().min(1, 'Vehicle type is required'),
  serviceType: z.enum(['DETAILING', 'PPF_WRAPPING', 'CAR_TECH', 'DIAGNOSTICS']),
  packageName: z.string().min(1, 'Package name is required'),
  scheduledAt: z.string().min(1, 'Date and time are required'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceType: 'DETAILING',
      vehicleType: 'SEDAN',
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      // Ensure scheduledAt is converted to a valid ISO-8601 string for Prisma
      const isoDate = new Date(data.scheduledAt).toISOString();
      const payload = { ...data, scheduledAt: isoDate };

      const response = await fetch('/api/bookings/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit booking');
      }

      setSuccessMsg(`Booking successful! Your reference is: ${result.bookingRef}`);
      reset();
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 glass-dark rounded-2xl shadow-xl text-white relative z-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary tracking-widest uppercase">
        Book an Appointment
      </h2>

      {successMsg && (
        <div className="bg-green-500/20 border border-green-500 text-green-200 p-4 rounded-lg mb-6 text-sm">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6 text-sm">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Customer Information Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-white/80 border-b border-white/10 pb-2 uppercase tracking-wide">
            1. Your Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">Full Name</label>
              <input
                {...register('name')}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded focus:outline-none focus:border-primary transition-colors duration-300 text-sm"
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">Phone</label>
              <input
                {...register('phone')}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded focus:outline-none focus:border-primary transition-colors duration-300 text-sm"
                placeholder="+94 7X XXX XXXX"
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">Email</label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded focus:outline-none focus:border-primary transition-colors duration-300 text-sm"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>
        </section>

        {/* Vehicle Information Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-white/80 border-b border-white/10 pb-2 uppercase tracking-wide">
            2. Vehicle Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">Make</label>
              <input
                {...register('make')}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded focus:outline-none focus:border-primary transition-colors duration-300 text-sm"
                placeholder="Toyota"
              />
              {errors.make && <p className="text-red-400 text-xs mt-1">{errors.make.message}</p>}
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">Model</label>
              <input
                {...register('model')}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded focus:outline-none focus:border-primary transition-colors duration-300 text-sm"
                placeholder="Corolla"
              />
              {errors.model && <p className="text-red-400 text-xs mt-1">{errors.model.message}</p>}
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">Year</label>
              <input
                {...register('year')}
                type="number"
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded focus:outline-none focus:border-primary transition-colors duration-300 text-sm"
                placeholder="2022"
              />
              {errors.year && <p className="text-red-400 text-xs mt-1">{errors.year.message}</p>}
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">Color</label>
              <input
                {...register('color')}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded focus:outline-none focus:border-primary transition-colors duration-300 text-sm"
                placeholder="Black"
              />
              {errors.color && <p className="text-red-400 text-xs mt-1">{errors.color.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">Vehicle Type</label>
              <select
                {...register('vehicleType')}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded focus:outline-none focus:border-primary transition-colors duration-300 text-sm text-white"
              >
                <option value="SEDAN" className="bg-neutral-900">Sedan</option>
                <option value="SUV" className="bg-neutral-900">SUV</option>
                <option value="HATCHBACK" className="bg-neutral-900">Hatchback</option>
                <option value="TRUCK" className="bg-neutral-900">Truck</option>
                <option value="VAN" className="bg-neutral-900">Van</option>
              </select>
              {errors.vehicleType && <p className="text-red-400 text-xs mt-1">{errors.vehicleType.message}</p>}
            </div>
          </div>
        </section>

        {/* Service Information Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-white/80 border-b border-white/10 pb-2 uppercase tracking-wide">
            3. Service & Appointment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">Service Type</label>
              <select
                {...register('serviceType')}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded focus:outline-none focus:border-primary transition-colors duration-300 text-sm text-white"
              >
                <option value="DETAILING" className="bg-neutral-900">Detailing</option>
                <option value="PPF_WRAPPING" className="bg-neutral-900">PPF / Wrapping</option>
                <option value="CAR_TECH" className="bg-neutral-900">Car Tech</option>
                <option value="DIAGNOSTICS" className="bg-neutral-900">Diagnostics</option>
              </select>
              {errors.serviceType && <p className="text-red-400 text-xs mt-1">{errors.serviceType.message}</p>}
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">Package Name</label>
              <input
                {...register('packageName')}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded focus:outline-none focus:border-primary transition-colors duration-300 text-sm"
                placeholder="e.g. Premium Exterior Polish"
              />
              {errors.packageName && <p className="text-red-400 text-xs mt-1">{errors.packageName.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">Preferred Date & Time</label>
              <input
                {...register('scheduledAt')}
                type="datetime-local"
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded focus:outline-none focus:border-primary transition-colors duration-300 text-sm dark:[color-scheme:dark]"
              />
              {errors.scheduledAt && <p className="text-red-400 text-xs mt-1">{errors.scheduledAt.message}</p>}
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full py-4 mt-6 rounded-full uppercase tracking-[0.2em] text-sm font-medium transition-all duration-500",
            isSubmitting 
              ? "bg-neutral-700 text-neutral-400 cursor-not-allowed border border-neutral-600" 
              : "bg-primary text-black hover:bg-primary-hover gold-glow"
          )}
        >
          {isSubmitting ? 'Processing...' : 'Confirm Appointment'}
        </button>
      </form>
    </div>
  );
}
