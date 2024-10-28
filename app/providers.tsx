'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { DeepgramContextProvider } from '@/contexts/DeepgramContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DeepgramContextProvider>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </DeepgramContextProvider>
  );
}