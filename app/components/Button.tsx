import Link from 'next/link'
import type { ButtonProps } from "@/types";

export default function Button({ children, href, onClick, variant = "primary", type = "button"}: ButtonProps) {
  const variantClass = {
    primary: "btn-primary",
    neutral: "btn-neutral",
    secondary: "btn-secondary",
    accent: "btn-accent"
  }[variant];

  const className = `btn ${variantClass}`;

  let link_specific;

  if (href) {
    link_specific = (
      <Link href={href} className={className}>
        {children}
      </Link>
    );

    return link_specific;
  }

  else {  
    return (
      <button type={type} onClick={onClick} className={className}>
        {children}
      </button>
    );
  }
}
