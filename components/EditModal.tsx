"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useBoardStore } from "@/store/BoardStore";
import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useEditModalStore } from "@/store/EditModalStore";
import getUrl from "@/lib/getUrl";
import EditTaskTypeRadioGroup from "./EditTaskTypeRadioGroup";

type Props = {
  todo: Todo;
};

function EditModal({ todo }: Props) {
  const [isOpen, closeModal, editingTodo] = useEditModalStore((state) => [
    state.isOpen,
    state.closeModal,
    state.editingTodo,
  ]);

  const [image, setImage, editTask, board] = useBoardStore((state) => [
    state.image,
    state.setImage,
    state.editTask,
    state.board,
  ]);

  useEffect(() => {
    console.log("Board updated:", board);
  }, [board]);

  const [title, setTitle] = useState(todo.title);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [taskType, setTaskType] = useState<TypedColumn>(
    editingTodo?.todo.status || "todo"
  );

  const imagePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const resetImageState = () => {
      setImage(null);
      setImageUrl(null);
    };

    if (todo.image) {
      const fetchImage = async () => {
        const url = await getUrl(todo.image!);
        if (url) {
          setImageUrl(url.toString());
        }
      };
      fetchImage();
    } else {
      resetImageState();
    }

    return resetImageState;
  }, [todo]);

  useEffect(() => {
    if (isOpen && editingTodo) {
      setTitle(editingTodo.todo.title);
      setTaskType(editingTodo.todo.status);
      if (editingTodo.todo.image) {
        const fetchImage = async () => {
          const url = await getUrl(editingTodo.todo.image!);
          if (url) {
            setImageUrl(url.toString());
          }
        };
        fetchImage();
      } else {
        setImageUrl(null);
      }
    }
  }, [isOpen, editingTodo]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingTodo) {
      await editTask(
        editingTodo.columnId,
        editingTodo.todo,
        editingTodo.taskIndex,
        title,
        taskType,
        image
      );
    }

    console.log("Submitted: ", { title, taskType, image });

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
            Edit the Task
          </DialogTitle>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a task here"
            className="w-full border border-gray-300 rounded-md outline-none p-5"
          />
          <EditTaskTypeRadioGroup
            selectedTaskType={taskType}
            setSelectedTaskType={setTaskType}
          />

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
            {imageUrl && (
              <Image
                alt="UploadImage"
                width={200}
                height={200}
                src={imageUrl}
                onClick={() => {
                  setImage(null);
                  setImageUrl(null);
                }}
                className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-pointer rounded-lg"
              />
            )}

            <input
              type="file"
              ref={imagePickerRef}
              onChange={(e) => {
                if (!e.target.files![0].type.startsWith("image/")) return;
                const file = e.target.files?.[0];
                if (file) {
                  setImage(file);
                  setImageUrl(URL.createObjectURL(file));
                }
              }}
              className="hidden"
            />
          </div>

          <div className="flex space-x-4 justify-between">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md bg-blue-100 w-full p-5 border border-transparent text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Update Task
            </button>
            <button
              type="button"
              onClick={() => closeModal()}
              className="inline-flex justify-center rounded-md bg-red-100 w-full p-5 border border-transparent text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}

export default EditModal;
