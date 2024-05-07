import { useState } from "react";
import {
  useAddTodoMutation,
  useGetTodosQuery,
  useRemoveTodoMutation,
  useUpdateTodoMutation,
} from "../api/apiSlice";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useRemoveTodoMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ userId: 1, title: newTodo, completed: false });
    setNewTodo("");
  };
  let content;
  if (isLoading) {
    content = "Loading...";
  } else if (isSuccess) {
    content = todos.map((todo) => {
      return (
        <article key={todo.id}>
          <div>
            <input
              type="checkbox"
              checked={todo.completed}
              id={todo.id}
              onChange={() =>
                updateTodo({ ...todo, completed: !todo.completed })
              }
            />
            <label htmlFor={todo.id}>{todo.title}</label>
            <button onClick={() => deleteTodo({ id: todo.id })}>Delete</button>
          </div>
        </article>
      );
    });
  } else if (isError) {
    content = <p>{error}</p>;
  }
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">Enter a new todo</label>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />

        <button>Submit</button>
      </form>
      <div>{content}</div>
    </>
  );
};

export default TodoList;
