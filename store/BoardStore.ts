import { databases } from "@/appwrite";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import { title } from "process";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import type {} from '@redux-devtools/extension' // required for devtools typing

const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
const collectionId = process.env.NEXT_PUBLIC_TOOLS_COLLECTION_ID;

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
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
    databases.updateDocument(databaseId!, collectionId!, todo.$id, {
      title: todo.title,
      status: columnId,
    });
  },
}));
