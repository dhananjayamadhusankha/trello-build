import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isConfirmOpen: boolean;
  openConfirmModal: () => void;
  closeConfirmModal: () => void;
  taskToDelete: { todo: Todo; index: number; id: TypedColumn } | null;
  setTaskToDelete: (task: { todo: Todo; index: number; id: TypedColumn } | null) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  isConfirmOpen: false,
  taskToDelete: null,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  openConfirmModal: () => set({ isConfirmOpen: true }),
  closeConfirmModal: () => set({ isConfirmOpen: false, taskToDelete: null }),
  setTaskToDelete: (task) => set({ taskToDelete: task }),
}));
