import { TodosContext } from "./todos-context";
import { useReducer } from "react";
import Todo from "../models/todo";
import { TodosContextObj } from "./todos-context";

const defaultTodosState = {
  items: [],
  modifyItemId: "",
  modifyItemText: "",
  modifyModalIsActivated: false,
};

const todosReducer = (state: any, action: any) => {
  let resultState;
  let updatedItemsState;
  switch (action.type) {
    case "ADD":
      const newTodo = new Todo(action.todoText);
      updatedItemsState = state.items.concat(newTodo);
      resultState = {
        items: updatedItemsState,
        modifyItemId: state.modifyItemId,
        modifyItemText: state.modifyItemText,
        modifyModalIsActivated: state.modifyModalIsActivated,
      };
      break;
    case "REMOVE":
      updatedItemsState = state.items.filter(
        (todo: any) => todo.id !== action.todoId
      );
      resultState = {
        items: updatedItemsState,
        modifyItemId: state.modifyItemId,
        modifyItemText: state.modifyItemText,
        modifyModalIsActivated: state.modifyModalIsActivated,
      };
      break;
    case "FIND_TODO":
      const findTodo = state.items.find(
        (todo: any) => todo.id === action.todoId
      );

      resultState = {
        items: state.items,
        modifyItemId: findTodo.id,
        modifyItemText: findTodo.text,
        modifyModalIsActivated: state.modifyModalIsActivated,
      };
      break;
    case "MODIFY":
      let existingItems = [...state.items];
      updatedItemsState = existingItems.map((item) => {
        if (item.id === action.item.id) {
          item.text = action.item.text;
          return item;
        } else {
          return item;
        }
      });

      resultState = {
        items: updatedItemsState,
        modifyItemId: "",
        modifyItemText: "",
        modifyModalIsActivated: state.modifyModalIsActivated,
      };

      break;
    case "SHOW_MODIFY":
      resultState = {
        ...state,
        modifyModalIsActivated: true,
      };
      console.log(resultState);
      break;
    case "HIDE_MODIFY":
      resultState = {
        ...state,
        modifyModalIsActivated: false,
      };
      break;
    default:
      resultState = {
        items: state.items,
        modifyItemId: state.modifyItemId,
        modifyItemText: state.modifyItemText,
        modifyModalIsActivated: state.modifyModalIsActivated,
      };
      break;
  }

  return resultState;
};

const TodoProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [todosState, dispatchTodosAction] = useReducer(
    todosReducer,
    defaultTodosState
  );

  const addTodoHandler = (todoText: string) => {
    dispatchTodosAction({ type: "ADD", todoText: todoText });
  };

  const removeTodoHandler = (todoId: string) => {
    dispatchTodosAction({ type: "REMOVE", todoId: todoId });
  };

  const findModifyTodoHanlder = (todoId: string) => {
    dispatchTodosAction({ type: "FIND_TODO", todoId: todoId });
  };

  const ModifyTodoHanlder = (item: Todo) => {
    dispatchTodosAction({ type: "MODIFY", item: item });
  };

  const showModifyHandler = () => {
    dispatchTodosAction({ type: "SHOW_MODIFY" });
  };

  const hideModifyHandler = () => {
    dispatchTodosAction({ type: "HIDE_MODIFY" });
  };

  const contextValue: TodosContextObj = {
    items: todosState?.items,
    modifyItemId: todosState?.modifyItemId,
    modifyItemText: todosState?.modifyItemText,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
    findModifyTodo: findModifyTodoHanlder,
    modifyTodo: ModifyTodoHanlder,
    modifyModalIsActivated: todosState?.modifyModalIsActivated,
    showModifyModal: showModifyHandler,
    hideModifyModal: hideModifyHandler,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodoProvider;
