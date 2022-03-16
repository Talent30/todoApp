import { useState, useReducer } from "react";
import TodoItem from "./TodoItem";

type Todo = {
  index: number;
  task: string;
  isCompleted: boolean;
};

type Todos = Todo[];

type ActionType =
  | { type: "ADD_TODO"; payload: string }
  | { type: "DELETE_TODO" }
  | { type: "TOGGLE_TODO"; payload: number };

enum ACTIONS {
  ADD_TODO = "ADD_TODO",
  DELETE_TODO = "DELETE_TODO",
  TOGGLE_TODO = "TOGGLE_TODO",
}

const initalTodo = [
  { index: 0, task: "task1", isCompleted: false },
  { index: 1, task: "task2", isCompleted: true },
  { index: 2, task: "taskwdw", isCompleted: false },
];

const newTodo = (task: string) => {
  return {
    index: Date.now(),
    task: task,
    isCompleted: false,
  };
};

const deleteTodo = (todos: Todos) => {
  return todos.filter((todo) => todo.isCompleted === false);
};

const toggleTodo = (todos: Todos, index: number) => {
  return todos.map((todo) =>
    todo.index === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
  );
};

const reducer = (todos: Todos, action: ActionType): Todos => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload)];
    case ACTIONS.DELETE_TODO:
      return deleteTodo(todos);
    case ACTIONS.TOGGLE_TODO:
      return toggleTodo(todos, action.payload);

    default:
      throw new Error("Unhandled action type");
  }
};

const App = () => {
  const [todos, dispatch] = useReducer(reducer, initalTodo);
  const [input, setInput] = useState("");

  console.table(todos);

  const handleAddTodo = () => {
    dispatch({ type: ACTIONS.ADD_TODO, payload: input });
    setInput("");
  };

  const handleDeleteTodo = () => {
    dispatch({ type: ACTIONS.DELETE_TODO });
  };

  const handleToggleTodo = (index: number) => {
    dispatch({ type: ACTIONS.TOGGLE_TODO, payload: index });
  };
  return (
    <>
      <h1>Hello world</h1>
      <input
        type="text"
        placeholder="todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="button" onClick={handleAddTodo}>
        Add
      </button>
      <button type="button" onClick={handleDeleteTodo}>
        Delete
      </button>
      {todos.map((todo: any) => (
        <TodoItem
          key={todo.index}
          index={todo.index}
          task={todo.task}
          isCompleted={todo.isCompleted}
          handleToggleTodo={handleToggleTodo}
        />
      ))}
    </>
  );
};

export default App;
