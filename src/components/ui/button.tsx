import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// "Press" buttons are lifted at rest and pressed on hover – see docs/design-system.md, section 5.
const press =
  "-translate-y-[3px] shadow-lifted hover:translate-y-0 hover:shadow-pressed active:translate-y-px active:shadow-pressed-deep active:duration-100"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-4 rounded-full font-medium whitespace-nowrap select-none transition-[background-color,box-shadow,transform,opacity,color] duration-500 ease-mist disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-40 disabled:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: cn(press, "bg-moss-800 text-white hover:bg-[#2a4034]"),
        dawn: cn(press, "bg-dawn-400 text-moss-950 [--sh:10_18_14] hover:bg-[#d9c08a]"),
        light: cn(press, "bg-mist-50 text-moss-950 [--sh:0_0_0] hover:bg-[#eceee7]"),
        danger: cn(press, "bg-ember-700 text-white [--sh:74_30_22] hover:bg-ember-800"),
        quiet: "bg-transparent text-moss-950 shadow-[inset_0_0_0_1px_var(--color-mist-300)] hover:bg-white hover:shadow-[inset_0_0_0_1px_var(--color-moss-300)]",
        "quiet-danger": "bg-transparent text-ember-700 shadow-[inset_0_0_0_1px_var(--color-ember-200)] hover:bg-ember-50",
        ghost: "bg-transparent text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.45)] hover:bg-white/10 hover:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.8)]",
        link: "rounded-none px-0 text-moss-800 opacity-75 hover:opacity-100",
      },
      size: {
        sm: "h-12 px-5 text-[15px]",
        md: "h-14 pr-6 pl-[30px] text-base",
        lg: "h-16 pr-8 pl-9 text-[17px]",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

// Long line arrow used at the end of CTA buttons.
function ButtonArrow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-block h-3 w-[34px] before:absolute before:top-1/2 before:right-px before:left-0 before:-mt-[0.75px] before:h-[1.5px] before:rounded-sm before:bg-current after:absolute after:top-1/2 after:right-px after:-mt-[4.5px] after:size-2 after:rotate-45 after:border-t-[1.5px] after:border-r-[1.5px] after:border-current",
        className
      )}
    />
  )
}

export { Button, ButtonArrow, buttonVariants }
