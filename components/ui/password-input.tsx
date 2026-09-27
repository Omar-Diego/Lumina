"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "cn"

function PasswordInput({
  className,
  visible: visibleProp,
  onVisibleChange,
  ...props
}: Omit<React.ComponentProps<typeof Input>, "type"> & {
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
}) {
  const [visibleState, setVisibleState] = React.useState(false)
  const visible = visibleProp ?? visibleState
  const setVisible = onVisibleChange ?? setVisibleState

  return (
    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        className={cn("pr-10", className)}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        tabIndex={-1}
        onClick={() => setVisible(!visible)}
        aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
        className="absolute top-1/2 right-1 -translate-y-1/2 text-[var(--gray-400)] hover:bg-transparent hover:text-[var(--gray-600)]"
      >
        {visible ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  )
}

export { PasswordInput }
