import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";

type Props = {
  id: TypedColumn;
  index: number;
  todos: Todo[];
};

const idToColumnText: { [key in TypedColumn]: string } = {
  todo: "To Do",
  inprogress: "Doing",
  done: "Done",
};

function Column({ id, index, todos }: Props) {
  const [searchString, setNewTaskType, board] = useBoardStore((state) => [
    state.searchString,
    state.setNewTaskType,state.board
  ]);
  const [openModal] = useModalStore((state) => [state.openModal]);

  const handleAddTodo = async () => {
    setNewTaskType(id);
    openModal();
  };
  

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {/* render droppable todos in the column */}
          <Droppable droppableId={index.toString()} type={"card"}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                }`}
              >
                <h2 className="flex justify-between text-lg lg:text-xl p-2 font-bold">
                  {idToColumnText[id]}
                  <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full font-normal">
                    {!searchString
                      ? todos.length
                      : todos.filter((todo) =>
                          todo.title
                            .toLocaleLowerCase()
                            .includes(searchString.toLocaleLowerCase())
                        ).length}
                  </span>
                </h2>

                <div className="space-y-2">
                  {todos.map((todo, index) => {
                    if (
                      searchString &&
                      !todo.title
                        .toLocaleLowerCase()
                        .includes(searchString.toLocaleLowerCase())
                    )
                      return null;

                    return (
                      <Draggable
                        key={todo.$id}
                        draggableId={todo.$id}
                        index={index}
                      >
                        {(provided) => (
                          <TodoCard
                            id={id}
                            todo={todo}
                            index={index}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}

                  <div className="flex justify-end items-end p-2">
                    <button
                      className=" text-green-500 hover:text-green-600"
                      onClick={handleAddTodo}
                    >
                      <PlusCircleIcon className="h-7 w-7" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
