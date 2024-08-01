import { useBoardStore } from "@/store/BoardStore";
import getUrl from "@/lib/getUrl";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import Image from "next/image";
import { useEditModalStore } from "@/store/EditModalStore";
import EditModal from "./EditModal";
import ConfirmModal from "./ConfirmModal";
import { useModalStore } from "@/store/ModalStore";

type Props = {
  id: TypedColumn;
  index: number;
  todo: Todo;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

function TodoCard({
  id,
  index,
  todo,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) {
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const [openConfirmModal] = useModalStore((state) => ([state.openConfirmModal]))
  const [openModal,setEditingTodo] = useEditModalStore((state) => [state.openModal, state.setEditingTodo]);
  
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getUrl(todo.image!);
        if (url) {
          setImageUrl(url.toString());
        }
      };

      fetchImage();
    }
  }, [todo]);

  const openEdit = () => {
    openModal();
    setEditingTodo({ todo, columnId: id, taskIndex: index, newTaskType:todo.status, image: null });
  };

  const hangleDeleteTask = () =>{
    console.log("Hanging delete")
    openConfirmModal()
  }

  return (
    <div
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
      className="bg-white rounded-md space-y-2 drop-shadow-md"
    >
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <div className="flex items-center">
          <button
            type="button"
            onClick={openEdit}
            className="text-yellow-500 hover:text-yellow-600"
          >
            <PencilSquareIcon className="ml-5 h-7 w-7" />
          </button>
          <button
            onClick={hangleDeleteTask}
            // onClick={() => deleteTask(index, todo, id)}
            className="text-red-500 hover:text-red-600"
          >
            <XCircleIcon className="ml-3 h-7 w-7" />
          </button>
        </div>
      </div>

      {imageUrl && (
        <div className="h-full w-full rounded-b-md">
          <Image
            src={imageUrl}
            width={400}
            height={200}
            alt={todo.title}
            className="w-full object-contain rounded-b-md"
          />
        </div>
      )}

      <ConfirmModal index={index} id={id} todo={todo} />

      <EditModal todo={todo} />
    </div>
  );
}

export default TodoCard;
