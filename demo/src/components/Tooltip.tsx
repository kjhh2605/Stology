import { cloneElement, type FocusEvent, type MouseEvent, type ReactElement, type ReactNode } from 'react';
import { useTooltip } from './TooltipProvider';

type TooltipTriggerProps = {
  'aria-describedby'?: string;
  onFocus?: (event: FocusEvent<HTMLElement>) => void;
  onBlur?: (event: FocusEvent<HTMLElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLElement>) => void;
};

type TooltipProps = {
  id: string;
  title: string;
  body: string;
  requirement: string;
  children: ReactElement<TooltipTriggerProps>;
};

export function Tooltip({ id, title, body, requirement, children }: TooltipProps) {
  const { show, hide } = useTooltip();
  const open = (target: HTMLElement) => {
    show({ id, title, body, requirement, rect: target.getBoundingClientRect() });
  };

  return cloneElement(children, {
    'aria-describedby': id,
    onFocus: (event: FocusEvent<HTMLElement>) => open(event.currentTarget),
    onBlur: () => hide(),
    onMouseEnter: (event: MouseEvent<HTMLElement>) => open(event.currentTarget),
    onMouseLeave: () => hide(),
  });
}

export function InfoLine({ children }: { children: ReactNode }) {
  return <p className="note-line">{children}</p>;
}
