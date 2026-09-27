"use client";

import { useState } from "react";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function CalificarForm({ action }: { action: (formData: FormData) => void }) {
  const [calificacion, setCalificacion] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <form action={action}>
      <input type="hidden" name="calificacion" value={calificacion} />

      <div
        className="mb-6 flex justify-center gap-2"
        onMouseLeave={() => setHover(0)}
      >
        {[1, 2, 3, 4, 5].map((n) => {
          const activa = (hover || calificacion) >= n;
          return (
            <button
              key={n}
              type="button"
              aria-label={`${n} estrella${n === 1 ? "" : "s"}`}
              onMouseEnter={() => setHover(n)}
              onClick={() => setCalificacion(n)}
              className="p-0.5"
            >
              <Star
                className={cn(
                  "size-8 transition-colors",
                  activa ? "fill-[var(--yellow)] text-[var(--yellow)]" : "fill-none text-[var(--border)]",
                )}
              />
            </button>
          );
        })}
      </div>

      <div className="mb-5 flex flex-col gap-2 text-left">
        <label htmlFor="comentario" className="text-[13.5px] font-extrabold text-[var(--ink)]">
          Cuéntanos más (opcional)
        </label>
        <Textarea
          id="comentario"
          name="comentario"
          placeholder="Explica todo con mucha claridad y tiene mucha paciencia…"
          className="min-h-[90px] rounded-[var(--radius-md)] border-[1.5px] border-[var(--border)] bg-[#f8fafd] px-4 py-3.5 text-[14.5px] font-bold text-[var(--ink)] placeholder:font-semibold placeholder:text-[var(--gray-400)] focus-visible:border-[var(--blue)] focus-visible:ring-[var(--blue)]/20"
        />
      </div>

      <Button
        type="submit"
        disabled={calificacion === 0}
        className="w-full justify-center rounded-[var(--radius-md)] py-3.5"
      >
        Enviar reseña
      </Button>
    </form>
  );
}
