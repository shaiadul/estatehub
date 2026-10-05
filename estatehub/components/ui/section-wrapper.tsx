import React from "react"
import { cn } from "cn"

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  as?: "div" | "section" | "main" | "header" | "footer" | "article"
  children?: React.ReactNode
  className?: string
  innerClassName?: string
  fullWidth?: boolean
}

export function SectionWrapper({
  as: Component = "section",
  children,
  className,
  innerClassName,
  fullWidth = false,
  ...props
}: SectionWrapperProps) {
  if (fullWidth) {
    return (
      <Component className={cn("w-full", className)} {...props}>
        <div className={cn("max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12", innerClassName)}>
          {children}
        </div>
      </Component>
    )
  }

  return (
    <Component
      className={cn("w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12", className)}
      {...props}
    >
      {children}
    </Component>
  )
}
