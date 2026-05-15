"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Premium Exterior & Interior Detailing",
    description: "Enjoy a completely refreshed cabin — clean, sanitised, and protected.",
    icon: "✨",
    buttonText: "VISIT"
  },
  {
    title: "Ceramic Coating & Protection",
    description: "Bring back your vehicle’s showroom shine with exterior care that goes beyond a basic wash.",
    icon: "🛡️",
    buttonText: "Grab This Deal"
  },
  {
    title: "Paint Protection Film (PPF) Installation",
    description: "Clean engine bay not only looks great but also makes inspection and maintenance easier.",
    icon: "🏎️",
    buttonText: "Grab This Deal"
  },
  {
    title: "Window Filming",
    description: "Enjoy a completely refreshed cabin — clean, sanitised, and protected.",
    icon: "🪟",
    buttonText: "Grab This Deal"
  },
  {
    title: "Engine Bay Cleaning & Clay Bar Treatment",
    description: "Over time, your vehicle’s paint collects bonded contaminants such as brake dust, industrial fallout, tree sap, and road grime. Regular washing cannot remove these embedded particles.",
    icon: "⚙️",
    buttonText: "Grab This Deal"
  },
  {
    title: "Vehicle Carpeting",
    description: "Over time, your vehicle’s paint collects bonded contaminants such as brake dust, industrial fallout, tree sap, and road grime. Regular washing cannot remove these embedded particles.",
    icon: "🧵",
    buttonText: "Grab This Deal"
  },
];

export function Services() {
  return (
    <section className="relative py-32 bg-bg-base overflow-hidden" id="services">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[1920px] relative z-10 mx-auto px-4 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-16 h-[2px] bg-primary mx-auto mb-8 shadow-[0_0_15px_rgba(212,175,55,0.5)]" 
          />
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-white"
          >
            Unmatched <span className="text-primary italic font-serif">Excellence</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-silver/80 text-lg leading-relaxed font-light"
          >
            We offer an exclusive suite of premium car care services designed to protect, enhance, and elevate the presence of your vehicle.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group relative p-10 bg-bg-surface border border-white/5 rounded-2xl hover:border-primary/40 transition-all duration-500 overflow-hidden cursor-pointer"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="text-3xl mb-6 grayscale mix-blend-luminosity opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500">
                  {service.icon}
                </div>
                <h3 className="text-xl font-medium mb-4 text-white tracking-wide">{service.title}</h3>
                <p className="text-silver/70 font-light leading-relaxed text-sm flex-grow">
                  {service.description}
                </p>
                <div className="mt-8 flex items-center text-primary text-xs uppercase tracking-[0.2em] font-medium opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {service.buttonText}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}