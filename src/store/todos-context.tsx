import React from "react";
import Todo from "../models/todo";

export type TodosContextObj = {
  items: Todo[];
  addTodo: (text: any) => void;
  removeTodo: (id: any) => void;
  findModifyTodo: (id: string) => void;
  modifyTodo: (item: Todo) => void;
  modifyItemId: string;
  modifyItemText: string;
  modifyModalIsActivated: boolean;
  showModifyModal: () => void;
  hideModifyModal: () => void;
};

export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  modifyItemId: "",
  modifyItemText: "",
  addTodo: () => {},
  removeTodo: (id: string) => {},
  modifyTodo: (item: Todo) => {},
  findModifyTodo: (id: string) => {},
  modifyModalIsActivated: false,
  showModifyModal: () => {},
  hideModifyModal: () => {},
});
