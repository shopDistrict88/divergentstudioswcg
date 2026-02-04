import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80",
  {
    variants: {
      variant: {
        default: "bg-black/40",
        accent: "border-[var(--accent)]/50 text-[var(--accent)]",
        subtle: "bg-white/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
