import Modal from "../UI/Modal";
import { TodosContext } from "../../store/todos-context";
import { Fragment, useContext, useRef, useState } from "react";
import classes from "./UpdateTodos.module.css";
const UpdateTodos: React.FC = (props) => {
  console.log("update");
  const todosCtx = useContext(TodosContext);
  const todoTextInputRef = useRef<HTMLInputElement>(null);
  const [todoText, setTodoText] = useState(todosCtx.modifyItemText);

  const onChangeHandler = () => {
    setTodoText(todoTextInputRef.current!.value);
  };
  const submitHandler = (event: React.FormEvent) => {
    event?.preventDefault();
    const enteredText = todoTextInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      return;
    }

    todosCtx.modifyTodo({
      id: todosCtx.modifyItemId,
      text: enteredText,
    });
    todosCtx.hideModifyModal();
  };

  const hideModifyHandler = () => {
    todosCtx.hideModifyModal();
  };
  return (
    <Fragment>
      <Modal onClose={hideModifyHandler}>
        <form onSubmit={submitHandler}>
          <h2>Modify Item</h2>
          <input
            className={classes.items}
            ref={todoTextInputRef}
            value={todoText}
            onChange={onChangeHandler}
          />
          <button className={classes.button} onClick={hideModifyHandler}>
            Close
          </button>
          <button className={classes.button}>Modify</button>
        </form>
      </Modal>
    </Fragment>
  );
};

export default UpdateTodos;
