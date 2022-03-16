import { useState } from "react";

type Props = {
  index: number;
  task: string;
  isCompleted: boolean;
  handleToggleTodo: (index: number) => void;
};

const TodoItem = (props: Props) => {
  const { index, task, isCompleted, handleToggleTodo } = props;
  const [isEdit, setEdit] = useState(false);
  const [input, setInput] = useState("");

  let todoItem = (
    <li>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => handleToggleTodo(index)}
      />
      {task}
      <button
        type="button"
        onClick={() => {
          setEdit(!isEdit);
        }}
      >
        Edit
      </button>
    </li>
  );

  return <>{todoItem}</>;
};

export default TodoItem;
