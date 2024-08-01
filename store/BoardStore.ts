import { databases, ID, storage } from "@/appwrite";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import imageUpload from "@/lib/uploadImage";
import toast from "react-hot-toast";
import { create } from "zustand";

const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
const collectionId = process.env.NEXT_PUBLIC_TOOLS_COLLECTION_ID;

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
  // tasks: { [key: string]: Todo[] };

  deleteTask: (taskIndex: number, todo: Todo, id: TypedColumn) => void;

  searchString: string;
  setSearchString: (searchString: string) => void;

  newTaskInput: string;
  newTaskType: TypedColumn;
  setnewTaskInput: (input: string) => void;
  setNewTaskType: (columnId: TypedColumn) => void;

  image: File | null;
  setImage: (image: File | null) => void;

  addTask: (columnId: TypedColumn, todo: string, image?: File | null) => void;
  editTask: (
    columnId: TypedColumn,
    todo: Todo,
    taskIndex: number,
    title: string,
    newTaskType: TypedColumn,
    image?: File | null
  ) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },

  searchString: "",
  setSearchString: (searchString: string) => set({ searchString }),

  getBoard: async () => {
    try {
      const board = await getTodosGroupedByColumn();
      set({ board });
    } catch (error) {
      console.error("Failed to fetch board data:", error);
      toast.error("Failed to fetch board data");
    }
  },

  setBoardState: (board) => set({ board }),

  updateTodoInDB: async (todo, columnId) => {
    const toastId = toast.loading("Loading...");

    try {
      await databases.updateDocument(databaseId!, collectionId!, todo.$id, {
        title: todo.title,
        status: columnId,
      });
      toast.success("Task updated successfully", { id: toastId });
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error("Failed to update task", { id: toastId });
    }
  },

  // tasks: {},

  deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
    const toastId = toast.loading("Loading...");

    try {
      const newColumns = new Map(get().board.columns);
      const newColumn = newColumns.get(id);
      if (!newColumn) return;

      // Update the column's todos
      const newTodos = newColumn.todos.slice();
      newTodos.splice(taskIndex, 1);
      newColumn.todos = newTodos;

      newColumns.set(id, newColumn);

      set({ board: { columns: newColumns } });

      // Delete the document
      await databases.deleteDocument(databaseId!, collectionId!, todo.$id);

      // Delete image if present
      if (todo.image) {
        await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
      }

      toast.success("Task deleted successfully", { id: toastId });
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Failed to delete task", { id: toastId });
    }
  },
  

  newTaskInput: "",
  newTaskType: "todo",
  setnewTaskInput: (input) => set({ newTaskInput: input }),
  setNewTaskType: (columnId) => set({ newTaskType: columnId }),

  image: null,
  setImage: (image: File | null) => set({ image }),

  addTask: async (columnId: TypedColumn, todo: string, image?: File | null) => {
    const toastId = toast.loading("Loading...");

    try {
      let file: Image | undefined;

      if (image) {
        const fileUploaded = await imageUpload(image);
        if (fileUploaded) {
          file = {
            bucketId: fileUploaded.bucketId,
            fileId: fileUploaded.$id,
          };
        }
      }

      const { $id } = await databases.createDocument(
        databaseId!,
        collectionId!,
        ID.unique(),
        {
          title: todo,
          status: columnId,
          ...(file && { image: JSON.stringify(file) }),
        }
      );

      set({ newTaskInput: "" });

      set((state) => {
        const newColumns = new Map(state.board.columns);
        const newTodo: Todo = {
          $id,
          $createdAt: new Date().toISOString(),
          status: columnId,
          title: todo,
          ...(file && { image: file }),
        };

        const column = newColumns.get(columnId);

        if (!column) {
          newColumns.set(columnId, {
            id: columnId,
            todos: [newTodo],
          });
        } else {
          newColumns.get(columnId)?.todos.push(newTodo);
        }
        return {
          board: { columns: newColumns },
        };
      });

      toast.success("Task added successfully", { id: toastId });
    } catch (error) {
      console.error("Failed to add task:", error);
      toast.error("Failed to add task", { id: toastId });
    }
  },

  editTask: async (
    columnId: TypedColumn,
    todo: Todo,
    taskIndex: number,
    title: string,
    newTaskType: TypedColumn,
    image?: File | null
  ) => {
    console.log("Before editTask:", get().board.columns);
    const toastId = toast.loading("Loading...");

    try {
      let file: Image | undefined;

      if (image === null && todo.image) {
        await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
      } else if (image) {
        if (todo.image) {
          await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
        }
        const fileUploaded = await imageUpload(image);
        if (fileUploaded) {
          file = {
            bucketId: fileUploaded.bucketId,
            fileId: fileUploaded.$id,
          };
        }
      }

      const updatedTodo: Partial<Todo> = {
        title,
        status: newTaskType,
        image: file !== undefined ? file : null,
      };

      await databases.updateDocument(databaseId!, collectionId!, todo.$id, {
        title,
        status: newTaskType,
        image: file !== undefined ? JSON.stringify(file) : null,
      });

      set((state) => {
        const newColumns = new Map(state.board.columns);
        const column = newColumns.get(columnId);

        if (column) {
          // Update the existing task instead of adding a new one
          column.todos[taskIndex] = {
            ...column.todos[taskIndex],
            ...updatedTodo,
          };
        } else {
          // If the column does not exist, create a new one (this is a fallback, ideally not needed)
          newColumns.set(columnId, {
            id: columnId,
            todos: [updatedTodo as Todo],
          });
        }

        console.log("After editTask:", newColumns);
        return {
          board: { columns: newColumns },
        };
      });

      toast.success("Task edited successfully", { id: toastId });
    } catch (error) {
      console.error("Failed to edit task:", error);
      toast.error("Failed to edit task");
    }
  },
}));
