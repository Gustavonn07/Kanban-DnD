import { useState, useCallback } from 'react';

export function useModal() {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const open = useCallback((modalName: string) => {
    setOpenModal(modalName);
  }, []);

  const close = useCallback(() => {
    setOpenModal(null);
  }, []);

  return {
    openModal,
    open,
    close,
  };
}
