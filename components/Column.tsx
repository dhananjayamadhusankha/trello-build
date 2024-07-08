import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";

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
                    {todos.length}
                  </span>
                </h2>

                <div>
                  {todos.map((todo, index) => (
                    <Draggable
                      key={todo.$id}
                      draggableId={todo.$id}
                      index={index}
                    >
                      {(provided) => (
                        <TodoCard
                          id={id}
                          index={index}
                          todo={todo}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}
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
