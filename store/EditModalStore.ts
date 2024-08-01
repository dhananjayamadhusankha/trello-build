import { create } from "zustand";

interface EditModalState {
  isOpen: boolean;
  editingTodo: { todo: Todo; columnId: TypedColumn; taskIndex: number } | null;
  openModal: () => void;
  closeModal: () => void;
  setEditingTodo: (
    editingTodo: {
      todo: Todo;
      columnId: TypedColumn;
      taskIndex: number;
      newTaskType?: TypedColumn;
      image?: File | null;
    } | null
  ) => void;
}

export const useEditModalStore = create<EditModalState>((set) => ({
  isOpen: false,
  editingTodo: null,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false, editingTodo: null }),
  setEditingTodo: (editingTodo) => set({ editingTodo }),
}));
