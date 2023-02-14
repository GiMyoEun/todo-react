import React, { Fragment, useContext } from "react";
import classes from "./TodoItem.module.css";
import { TodosContext } from "../store/todos-context";
const TodoItem: React.FC<{
  text: string;
  id: string;
  onRemoveTodo: () => void;
}> = (props) => {
  const todosCtx = useContext(TodosContext);
  const showModifyModalHandler = (id: string) => {
    todosCtx.findModifyTodo(id);
    todosCtx.showModifyModal();
  };

  return (
    <Fragment>
      <li className={classes.item} onClick={props.onRemoveTodo}>
        {props.text}
      </li>
      <button
        className={classes.button}
        onClick={showModifyModalHandler.bind(null, props.id)}
      >
        modify
      </button>
    </Fragment>
  );
};

export default TodoItem;
