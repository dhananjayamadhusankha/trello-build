"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useModalStore } from "@/store/ModalStore";
import { useBoardStore } from "@/store/BoardStore";
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";
import { FormEvent, useRef } from "react";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/solid";

function Modal() {
  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ]);
  const [newTaskInput, setnewTaskInput, image, setImage, addTask, newTaskType] =
    useBoardStore((state) => [
      state.newTaskInput,
      state.setnewTaskInput,
      state.image,
      state.setImage,
      state.addTask,
      state.newTaskType,
    ]);
  const imagePickerRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskInput) return;

    // add task input
    addTask(newTaskType, newTaskInput, image);

    setImage(null);
    closeModal();
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={closeModal}
        transition
        as="form"
        onSubmit={handleSubmit}
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <DialogPanel className="max-w-lg space-y-4 bg-white p-12 rounded-xl w-full">
          <DialogTitle className="font-bold text-lg text-gray-900 pb-2">
            Add a Task
          </DialogTitle>
          <input
            type="text"
            value={newTaskInput}
            onChange={(e) => setnewTaskInput(e.target.value)}
            placeholder="Enter a task here"
            className="w-full border border-gray-300 rounded-md outline-none p-5"
          />
          <TaskTypeRadioGroup />

          <div>
            <button
              type="button"
              onClick={() => {
                imagePickerRef.current?.click();
              }}
              className="w-full border border-gray-300 p-5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <PhotoIcon className="h-6 w-6 inline-block" /> Upload Image
            </button>
            {image && (
              <Image
                alt="UploadImage"
                width={200}
                height={200}
                src={URL.createObjectURL(image)}
                onClick={() => setImage(null)}
                className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed rounded-lg"
              />
            )}
            <input
              type="file"
              hidden
              accept="image/*"
              ref={imagePickerRef}
              onClick={() => setImage(null)}
              onChange={(e) => {
                if (!e.target.files![0].type.startsWith("image/")) return;
                setImage(e.target.files![0]);
              }}
            />
          </div>

          <div className="flex space-x-4 justify-between">
            <button
              type="submit"
              disabled={!newTaskInput}
              className="inline-flex justify-center rounded-md bg-blue-100 w-full p-5 border border-transparent text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              Add Task
            </button>
            <button
              type="button"
              onClick={() => closeModal()}
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

export default Modal;
