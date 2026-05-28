"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center">

      {/* Background glow */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/10 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10" />

      <div className="relative z-20 container mx-auto px-4 lg:px-24 pt-40">

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-10"
        >

          <div className="w-24 h-[2px] bg-primary mx-auto mb-8 gold-glow" />

          <p className="text-primary uppercase tracking-[0.45em] text-xs md:text-sm mb-5">
            Premium Auto Care
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-[110px] leading-none tracking-tight font-medium text-white text-glow">
            Precision <br />
            Detailing
          </h1>

          <p className="mt-8 text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Experience luxury automotive detailing crafted with precision,
            protection, and perfection.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10">

            <a href="#booking" className="px-8 py-4 rounded-full bg-primary text-black uppercase tracking-[0.2em] text-sm font-medium hover:bg-primary-hover transition-all duration-500 gold-glow">
              Book Appointment
            </a>

            <a href="#services" className="px-8 py-4 rounded-full border border-white/10 text-white uppercase tracking-[0.2em] text-sm hover:border-primary hover:text-primary transition-all duration-500">
              Explore Services
            </a>

          </div>
        </motion.div>

        {/* Car */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative w-full max-w-6xl mx-auto aspect-[20/9]"
        >
          <Image
            src="/images/hero_car.jpg"
            alt="Luxury Car"
            fill
            priority
            unoptimized
            className="object-contain"
          />
        </motion.div>

      </div>
    </section>
  );
}