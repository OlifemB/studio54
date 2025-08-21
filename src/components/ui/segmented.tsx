import React, { useEffect, useMemo, useRef, useState } from "react";

type SegOptionValue = string | number;
export type SegOption =
  | SegOptionValue
  | { label: React.ReactNode; value: SegOptionValue; disabled?: boolean; icon?: React.ReactNode };

type Size = "small" | "middle" | "large";

export interface SegmentedProps {
  options: SegOption[];
  value?: SegOptionValue;                 // контролируемый режим
  defaultValue?: SegOptionValue;          // неконтролируемый режим
  onChange?: (val: SegOptionValue) => void;
  size?: Size;
  block?: boolean;                        // на всю ширину
  disabled?: boolean;
  className?: string;
  name?: string;                          // для форм (опционально)
  ariaLabel?: string;
}

function normalize(opt: SegOption) {
  if (typeof opt === "string" || typeof opt === "number") {
    return { label: String(opt), value: opt, disabled: false, icon: null };
  }
  return { label: opt.label, value: opt.value, disabled: !!opt.disabled, icon: opt.icon ?? null };
}

const sizeClasses: Record<Size, { container: string; item: string; font: string; gap: string }> = {
  small:  { container: "p-1", item: "px-2 py-1", font: "text-sm",   gap: "gap-1" },
  middle: { container: "p-1", item: "px-3 py-1.5", font: "text-base", gap: "gap-1.5" },
  large:  { container: "p-1.5", item: "px-4 py-2", font: "text-base", gap: "gap-2" },
};

export const Segmented: React.FC<SegmentedProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  size = "middle",
  block = false,
  disabled = false,
  className = "",
  name,
  ariaLabel,
}) => {
  const items = useMemo(() => options.map(normalize), [options]);

  // неконтролируемое значение
  const [inner, setInner] = useState<SegOptionValue | undefined>(
    value !== undefined ? value : defaultValue ?? items[0]?.value
  );
  const isControlled = value !== undefined;
  const current = isControlled ? value : inner;

  // refs для измерений
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // позиция и размер “ползунка”
  const [thumb, setThumb] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  // вычисляем позицию по выбранному значению
  const updateThumb = () => {
    const idx = items.findIndex((i) => i.value === current);
    if (idx < 0) return;
    const el = itemRefs.current[idx];
    const root = containerRef.current;
    if (!el || !root) return;
    const rootRect = root.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setThumb({ left: rect.left - rootRect.left, width: rect.width });
  };

  // следим за изменением значения/размеров контейнера
  useEffect(() => {
    if (typeof window === "undefined") return;
    updateThumb();

    const ro = new ResizeObserver(() => updateThumb());
    if (containerRef.current) ro.observe(containerRef.current);
    itemRefs.current.forEach((n) => n && ro.observe(n));
    window.addEventListener("resize", updateThumb);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateThumb);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, items.length, size]);

  const setValue = (val: SegOptionValue) => {
    if (!isControlled) setInner(val);
    onChange?.(val);
  };

  const cls = sizeClasses[size];

  // клавиатурная навигация
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const enabled = items.filter((i) => !i.disabled);
    if (!enabled.length) return;

    const idx = enabled.findIndex((i) => i.value === current);
    const goto = (i: number) => setValue(enabled[(i + enabled.length) % enabled.length].value);

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        goto(idx + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        goto(idx - 1);
        break;
      case "Home":
        e.preventDefault();
        goto(0);
        break;
      case "End":
        e.preventDefault();
        goto(enabled.length - 1);
        break;
      case "Enter":
      case " ":
        // уже выбрано текущим фокусом — ничего
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={[
        "relative inline-flex select-none rounded-2xl",
        "text-gray-900",
        "transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2",
        cls.container,
        cls.font,
        block ? "w-full" : "w-auto",
        disabled ? "opacity-60 pointer-events-none" : "",
        cls.gap,
        className,
      ].join(" ")}
    >
      {/* thumb (индикатор выбранного) */}
      <div
        aria-hidden
        style={{ width: thumb.width, transform: `translateX(${thumb.left}px)` }}
        className="pointer-events-none absolute top-0 bottom-0 rounded-xl bg-white shadow transition-transform duration-200 ease-out"
      />

      {/* варианты */}
      {items.map((item, i) => {
        const active = item.value === current;
        const itemDisabled = disabled || item.disabled;

        return (
          <button
            key={String(item.value)}
            ref={(el) => (itemRefs.current[i] = el)}
            role="radio"
            aria-checked={active}
            aria-disabled={itemDisabled || undefined}
            name={name}
            type="button"
            disabled={itemDisabled}
            onClick={() => setValue(item.value)}
            className={[
              "relative z-[1] inline-flex items-center justify-center whitespace-nowrap",
              "rounded-xl",
              "transition-colors",
              cls.item,
              active ? "text-gray-900" : "text-gray-600",
              !active ? "hover:text-gray-900" : "",
            ].join(" ")}
          >
            {item.icon ? <span className="mr-2 inline-flex">{item.icon}</span> : null}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Segmented;