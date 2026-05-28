import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-xl bg-black/30">
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-12 h-24 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="relative z-10">
          <Image
            src="/images/logo-removebg-preview.png"
            alt="Gloss Lab"
            width={220}
            height={80}
            className="h-14 w-auto object-contain"
            priority
          />
        </Link>

        {/* Nav */}
        <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm uppercase tracking-[0.2em] text-gray-300 hover:text-primary transition duration-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/#booking"
          className="px-7 py-3 rounded-full border border-primary/30 text-sm uppercase tracking-[0.18em] text-primary hover:bg-primary hover:text-black transition-all duration-500 gold-glow"
        >
          Book Now
        </Link>
      </div>
    </header>
  );
}