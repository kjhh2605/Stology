import { createContext, type ReactNode, useContext, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

type TooltipPayload = {
  id: string;
  title: string;
  body: string;
  requirement: string;
  rect: DOMRect;
};

type TooltipContextValue = {
  show: (payload: TooltipPayload) => void;
  hide: () => void;
};

const TooltipContext = createContext<TooltipContextValue | null>(null);

export function TooltipProvider({ children }: { children: ReactNode }) {
  const [tooltip, setTooltip] = useState<TooltipPayload | null>(null);
  const value = useMemo<TooltipContextValue>(() => ({ show: setTooltip, hide: () => setTooltip(null) }), []);
  const style = tooltip ? getTooltipStyle(tooltip.rect) : undefined;

  return (
    <TooltipContext.Provider value={value}>
      {children}
      {tooltip &&
        createPortal(
          <aside id={tooltip.id} role="tooltip" className="tooltip-layer" style={style}>
            <strong>{tooltip.title}</strong>
            <span>{tooltip.body}</span>
            <small>{tooltip.requirement}</small>
          </aside>,
          document.body,
        )}
    </TooltipContext.Provider>
  );
}

export function useTooltip() {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('TooltipProvider is required');
  }
  return context;
}

function getTooltipStyle(rect: DOMRect) {
  const width = 280;
  const left = Math.min(Math.max(16, rect.left), window.innerWidth - width - 16);
  const below = rect.bottom + 12;
  const top = below > window.innerHeight - 128 ? Math.max(16, rect.top - 132) : below;
  return { left, top, width };
}
