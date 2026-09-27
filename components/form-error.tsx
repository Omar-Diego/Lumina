import { CircleAlert } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";

export function FormError({ message }: { message: string }) {
  return (
    <Alert variant="destructive" className="border-[var(--red-light)]">
      <CircleAlert className="size-4" />
      <AlertDescription className="font-semibold">{message}</AlertDescription>
    </Alert>
  );
}
