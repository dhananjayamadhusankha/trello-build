"use client";
import { Fragment } from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { useModalStore } from "@/store/modalStore";
import { useBoardStore } from "@/store/BoardStore";
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";

function Modal() {
  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ]);
  const [newTaskInput, setnewTaskInput] = useBoardStore((state) => [
    state.newTaskInput,
    state.setnewTaskInput,
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
        <DialogPanel className="max-w-lg space-y-4 bg-white p-12 rounded-xl w-full">
          <DialogTitle className="font-bold text-lg text-gray-900 pb-2">
            Task
          </DialogTitle>
          <input
            type="text"
            value={newTaskInput}
            onChange={(e) => setnewTaskInput(e.target.value)}
            placeholder="Enter a task here"
            className="w-full border border-gray-300 rounded-md outline-none p-5"
          />
          <TaskTypeRadioGroup />
        </DialogPanel>
      </Dialog>
    </>
  );
}

export default Modal;
