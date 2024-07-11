"use client";

import { useBoardStore } from "@/store/BoardStore";
import { useEffect, useRef } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from "./Column";

function Board() {
  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore(
    (state) => [
      state.board,
      state.getBoard,
      state.setBoardState,
      state.updateTodoInDB,
    ]
  );
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      getBoard();
      hasFetched.current = true;
    }
  }, [getBoard]);

  // console.log("Board state:", board);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    // check if user dragged card outside of the board
    if (!destination) return;

    // Handle column drag
    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangeColumn = new Map(entries);
      setBoardState({ ...board, columns: rearrangeColumn });
    }

    // This step is need as he indexes are stored as numbers 0,1,2 etc. instead of id's with DND library
    const columns = Array.from(board.columns);

    const startColumnIndex = columns[Number(source.droppableId)];
    const finishColumnIndex = columns[Number(destination.droppableId)];

    const startCol: Column = {
      id: startColumnIndex[0],
      todos: startColumnIndex[1].todos,
    };

    const finishCol: Column = {
      id: finishColumnIndex[0],
      todos: finishColumnIndex[1].todos,
    };

    if (!startCol || !finishCol) return;

    if (source.index === destination.index && startCol === finishCol) return;

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);

    if (startCol.id === finishCol.id) {
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol: Column = {
        id: startCol.id,
        todos: newTodos,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);
      setBoardState({ ...board, columns: newColumns });
    } else {
      const finishTodos = finishCol.todos;
      console.log("finishTodos", finishTodos);
      finishTodos.splice(destination.index, 0, todoMoved);
      const startNewCol: Column = {
        id: startCol.id,
        todos: newTodos,
      };
      const finishNewCol: Column = {
        id: finishCol.id,
        todos: finishTodos,
      };
      const finishColumns = new Map(board.columns);
      finishColumns.set(startCol.id, startNewCol);
      finishColumns.set(finishCol.id, finishNewCol);

      updateTodoInDB(todoMoved, finishCol.id);
      setBoardState({ ...board, columns: finishColumns });
    }
  };

  if (!board || !board.columns.size) {
    return <div>Loading...</div>;
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId={"board"} direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-5 px-5"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
