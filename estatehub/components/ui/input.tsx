import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

export const inputVariants = cva(
  "w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default: "",
        borderless: "border-none bg-transparent shadow-none focus-visible:ring-0",
        filled: "border-transparent bg-surface-container hover:bg-surface-container-high focus-visible:bg-transparent",
        luxury: "border-outline-variant/30 bg-surface-container-low focus-visible:ring-primary/20",
      },
      inputSize: {
        xs: "h-6 px-2 text-xs",
        sm: "h-7 px-2 text-xs",
        default: "h-8 px-2.5 text-sm",
        md: "h-9 px-3 text-sm",
        lg: "h-10 px-3.5 text-base",
        xl: "h-11 px-4 text-base",
        hero: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  size?: "xs" | "sm" | "default" | "md" | "lg" | "xl" | "hero" | number
}

function Input({ className, type, variant, inputSize, size, ...props }: InputProps) {
  const resolvedSize = typeof size === "string" ? size : inputSize || "default"
  const htmlSize = typeof size === "number" ? size : undefined

  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      size={htmlSize}
      className={cn(
        inputVariants({
          variant,
          inputSize: resolvedSize as VariantProps<typeof inputVariants>["inputSize"],
        }),
        className
      )}
      {...props}
    />
  )
}

export { Input }
