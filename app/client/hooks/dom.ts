import { useEffect } from 'react';

export function useDisablePageScroll({ when }: { when: boolean }) {
  useEffect(() => {
    if (when) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [when]);
}
