import { databases } from "@/appwrite";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import type {} from '@redux-devtools/extension' // required for devtools typing

const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
const collectionId = process.env.NEXT_PUBLIC_TOOLS_COLLECTION_ID;

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todos: Todo, columnId: TypedColumn) => void;
  // deleteTask: (todos: Todo, columnId: TypedColumn, taskIndex: number) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },

  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },

  setBoardState: (board) => set({ board }),

  updateTodoInDB: async (todo, columnId) => {
    await databases.updateDocument(databaseId!, collectionId!, todo.$id, {
      title: todo.title,
      status: columnId,
    });
  },
  // deleteTask: async (todos, columnId, taskIndex) => {
  //   const newColumns = new Map(get().board.columns)
  //   newColumns.get(id)?.todos.splice(taskIndex,1);
  //   set({board:{columns:newColumns}});

  //   if(todo?.image){
  //     await storage.deleteFile(todo.image.bucketId,todo.image.fileId)
  //   }
  //   await databases.deleteDocument(databaseId!, collectionId!, todos.$id)
  // }
}));
