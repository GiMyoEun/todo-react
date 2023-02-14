import React, { useContext } from "react";
import TodoItem from "./TodoItem";

import classes from "./Todos.module.css";
import { TodosContext } from "../store/todos-context";

const Todos: React.FC = (props) => {
  const todosCtx = useContext(TodosContext);

  const removeHandler = (id: any) => {
    todosCtx.removeTodo(id);
  };

  return (
    <ul className={classes.todos}>
      {todosCtx.items.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          text={item.text}
          onRemoveTodo={removeHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );
};

export default Todos;
