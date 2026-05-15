"use client";

import { motion } from "framer-motion";

export function Contact() {
  return (
    <section className="relative py-32 bg-bg-base overflow-hidden" id="contact">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 item-center">
          
          {/* Left Column: Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="w-16 h-[2px] bg-primary mb-8 shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
            
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-white leading-tight">
              Have inquiries? <br />
              <span className="text-primary italic font-serif">Reach out!</span>
            </h2>
            
            <p className="text-silver/80 text-lg leading-relaxed font-light mb-12">
              We are here to assist you with any questions or concerns you may have. Feel free to reach out to us anytime.
            </p>

            <div className="space-y-10">
              {/* Location */}
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center bg-primary/10 text-primary flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <h4 className="text-white text-lg tracking-wide mb-2">Location</h4>
                  <p className="text-silver/70 font-light">Warapitiya, Mathugama Rd, <br/> Aluthgama</p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center bg-primary/10 text-primary flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <div>
                  <h4 className="text-white text-lg tracking-wide mb-2">Mobile / WhatsApp</h4>
                  <ul className="text-silver/70 font-light space-y-1">
                    <li><a href="tel:+94774338002" className="hover:text-primary transition-colors">+94 77 433 8002 - Chamod</a></li>
                    <li><a href="tel:+94702606858" className="hover:text-primary transition-colors">+94 70 260 6858 - Sahan</a></li>
                    <li><a href="tel:+94702133691" className="hover:text-primary transition-colors">+94 70 213 3691 - Amith</a></li>
                  </ul>
                </div>
              </div>

              {/* Socials */}
              <div className="pt-4 flex gap-6">
                <a href="#" className="text-silver hover:text-primary transition-all duration-300 transform hover:-translate-y-1">
                  <span className="uppercase tracking-[0.2em] text-sm font-medium">Facebook</span>
                </a>
                <a href="#" className="text-silver hover:text-primary transition-all duration-300 transform hover:-translate-y-1">
                  <span className="uppercase tracking-[0.2em] text-sm font-medium">Instagram</span>
                </a>
                <a href="#" className="text-silver hover:text-primary transition-all duration-300 transform hover:-translate-y-1">
                  <span className="uppercase tracking-[0.2em] text-sm font-medium">TikTok</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Map */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full h-full min-h-[400px] lg:min-h-[600px] relative rounded-2xl overflow-hidden border border-white/10 group"
          >
            <div className="absolute inset-0 bg-primary/20 pointer-events-none mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-700" />
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15856.883907080516!2d80.00371405000001!3d6.4262174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae22e1762c90fbf%3A0xe54ebde7dc9d316e!2sAluthgama!5e0!3m2!1sen!2slk!4v1716260170000!5m2!1sen!2slk" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(1) contrast(1.2) opacity(0.8)' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}