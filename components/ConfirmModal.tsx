import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

function ConfirmModal() {
  const [isConfirmOpen, closeConfirmModal] = useModalStore((state) => [
    state.isConfirmOpen,
    state.closeConfirmModal,
  ]);

  const taskToDelete = useModalStore((state) => state.taskToDelete);
  const deleteTask = useBoardStore((state) => state.deleteTask);

  if (!taskToDelete) return null; 

  const handleDeleteSubmit = () => {
    const { index, todo, id } = taskToDelete;
    deleteTask(index, todo, id);
    closeConfirmModal();
  };

  return (
    <Dialog
      open={isConfirmOpen}
      onClose={closeConfirmModal}
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      <DialogPanel className="max-w-lg space-y-4 bg-white p-12 rounded-xl w-full">
        <DialogTitle className="font-bold text-lg text-gray-900">
          Do you want to delete this task?
        </DialogTitle>
        <p className="text-sm/6 text-black/50">
          This action cannot be undone. This will permanently delete your task!
        </p>

        <div className="flex space-x-4 justify-between">
          <button
            type="button"
            onClick={handleDeleteSubmit}
            className="inline-flex justify-center rounded-md bg-red-100 w-full p-5 border border-transparent text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={closeConfirmModal}
            className="inline-flex justify-center rounded-md bg-gray-100 w-full p-5 border border-transparent text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            Close
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
}

export default ConfirmModal;
