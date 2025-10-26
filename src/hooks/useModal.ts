"use client"
import { useState } from "react";

function useModal<T = any>() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = (_meta?: T) => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openModal,
    closeModal,
  };
}

export default useModal;
