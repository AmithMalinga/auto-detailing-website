import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import BookingForm from "@/components/forms/BookingForm";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        
        {/* Booking Form Integration */}
        <section className="py-24 relative overflow-hidden" id="booking">
          {/* Background glow for consistency */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
                Book Your <span className="text-primary text-glow font-bold">Slot</span>
              </h2>
              <p className="text-neutral-400 max-w-2xl mx-auto font-light text-lg">
                Secure your appointment online. Provide your details and vehicle type below.
              </p>
            </div>
            <BookingForm />
          </div>
        </section>

        <Contact />
      </main>
    </>
  );
}

