import { useState, useContext, Fragment } from "react";
import { TodosContext } from "./store/todos-context";
import Todos from "./components/Todos";
import "./App.css";
import Todo from "./models/todo";
import NewTodo from "./components/NewTodo";
import TodoProvider from "./store/TodoProvider";
import UpdateTodos from "./components/UpdateTodos/UpdateTodos";

function App() {
  const todosCtx = useContext(TodosContext);
  const [modifyModalIsActivated, setModifyModalIsActivated] = useState(false);
  console.log(todosCtx);

  return (
    <TodoProvider>
      {todosCtx.modifyModalIsActivated && (
        <Fragment>
          <UpdateTodos />
        </Fragment>
      )}
      <NewTodo />
      <Todos />
    </TodoProvider>
  );
}

export default App;
