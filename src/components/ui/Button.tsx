import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "glass" | "outline";
  href?: string;
};

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "glass" | "outline";
  href: string;
};

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-[0.2em] uppercase transition-all duration-500 ease-in-out";
  
  const variants = {
    primary: "bg-primary text-black hover:bg-white hover:text-black shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]",
    glass: "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-primary/50 hover:text-primary",
    outline: "border border-silver/50 text-silver hover:border-primary hover:text-primary"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({ variant = "primary", className = "", href, children, ...props }: AnchorProps) {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-[0.2em] uppercase transition-all duration-500 ease-in-out";
  
  const variants = {
    primary: "bg-primary text-black hover:bg-white hover:text-black shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]",
    glass: "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-primary/50 hover:text-primary",
    outline: "border border-silver/50 text-silver hover:border-primary hover:text-primary"
  };

  return (
    <Link href={href} className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}