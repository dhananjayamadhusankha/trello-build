import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isConfirmOpen: boolean;
  closeConfirmModal: () => void;
  openConfirmModal: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  isOpen: false,
  isConfirmOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  openConfirmModal: () => set({ isConfirmOpen: true }),
  closeConfirmModal: () => set({ isConfirmOpen: false }),
}));
