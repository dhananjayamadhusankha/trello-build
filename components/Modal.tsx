"use client"
import { Fragment } from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { useModalStore } from "@/store/modalStore";

function Modal() {
  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ]);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => closeModal}
        transition
        as="form"
        className="fixed inset-0 rounded-lg flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <DialogPanel className="max-w-lg space-y-4 bg-white p-12 rounded-xl">
          <DialogTitle className="font-bold text-lg text-gray-900 pb-2">Deactivate account</DialogTitle>
          <Description>This will permanently deactivate your account</Description>
          <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
          <div className="flex gap-4">
            <button onClick={() => closeModal}>Cancel</button>
            <button onClick={() => closeModal}>Deactivate</button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}

export default Modal;
