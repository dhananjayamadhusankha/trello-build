"use client";

import { useModalStore } from "@/store/ModalStore";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";


type Props = {
  index: number;
  id: TypedColumn;
  todo: Todo;
};

function ConfirmModal({ index, id, todo }: Props) {

  const [isConfirmOpen, closeConfirmModal, openConfirmModal] = useModalStore((state) => [
    state.isConfirmOpen,
    state.closeConfirmModal,
    state.openConfirmModal,
  ]);
  
  return (
    <>
      <Dialog
        open={isConfirmOpen}
        onClose={closeConfirmModal}
        transition
        as="form"
        // onSubmit={handleSubmit}
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <DialogPanel className="max-w-lg space-y-4 bg-white p-12 rounded-xl w-full">
          <DialogTitle className="font-bold text-lg text-gray-900 pb-2">
            Add a Task
          </DialogTitle>

          <div className="flex space-x-4 justify-between">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md bg-blue-100 w-full p-5 border border-transparent text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              Add Task
            </button>
            <button
              type="button"
              onClick={() => closeConfirmModal()}
              className="inline-flex justify-center rounded-md bg-red-100 w-full p-5 border border-transparent text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}

export default ConfirmModal;
