import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // 🔧 기본 스타일 개선
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-neutral-100 disabled:from-neutral-100 disabled:to-neutral-100 disabled:text-neutral-300 border border-neutral-200 shadow-sm",
  {
    variants: {
      variant: {
        // 🚀 주요 액션용 (파란색 그라디언트)
        primary:
          "bg-gradient-to-b from-blue-600 to-blue-700 text-primary-foreground hover:from-blue-700 hover:to-blue-700",
        
        // 🤍 보조 액션용 (흰색 배경)
        secondary:
          "bg-white text-black hover:bg-neutral-100",
        
        // ⚠️ 위험한 액션용 (주황색 그라디언트)
        destructive:
          "bg-gradient-to-b from-amber-600 to-amber-700 text-destructive-foreground hover:from-amber-700 hover:to-amber-700",
        
        // 👻 미묘한 액션용 (투명 배경)
        ghost: "border-transparent shadow-none hover:bg-accent hover:text-accent-foreground",
        
        // 🔲 테두리만 있는 버튼
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        
        // 🔇 비활성화된 느낌의 버튼
        muted:
          "bg-neutral-200 text-neutral-600 hover:bg-neutral-200/80",
        
        // 🔵 3차 액션용 (연한 파란색)
        tertiary:
          "bg-blue-100 text-blue-600 border-transparent hover:bg-blue-200 shadow-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3",
        xs: "h-7 rounded-md px-2 text-xs",  // 🆕 더 작은 크기
        lg: "h-12 rounded-md px-8",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "primary",  // 🔄 기본값을 primary로 변경
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
