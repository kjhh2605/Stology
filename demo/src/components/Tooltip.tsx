import { cloneElement, type ReactElement, type ReactNode } from 'react';
import { useTooltip } from './TooltipProvider';

type TooltipProps = {
  id: string;
  title: string;
  body: string;
  requirement: string;
  children: ReactElement<{ 'aria-describedby'?: string; onFocus?: () => void; onBlur?: () => void; onMouseEnter?: () => void; onMouseLeave?: () => void }>;
};

export function Tooltip({ id, title, body, requirement, children }: TooltipProps) {
  const { show, hide } = useTooltip();
  const open = (target: EventTarget | null) => {
    if (target instanceof HTMLElement) {
      show({ id, title, body, requirement, rect: target.getBoundingClientRect() });
    }
  };

  return cloneElement(children, {
    'aria-describedby': id,
    onFocus: (event: { currentTarget: EventTarget }) => open(event.currentTarget),
    onBlur: hide,
    onMouseEnter: (event: { currentTarget: EventTarget }) => open(event.currentTarget),
    onMouseLeave: hide,
  });
}

export function InfoLine({ children }: { children: ReactNode }) {
  return <p className="info-line">{children}</p>;
}
