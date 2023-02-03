import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '../api/apiSlice';
import { Loading, Report } from 'notiflix';
import { nanoid } from '@reduxjs/toolkit';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const { data, isLoading, isSuccess, isError, error } = useGetTodosQuery(); //select data

  //select function
  const [addTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  //console.log(useAddTodoMutation());

  const handleSubmit = e => {
    e.preventDefault();
    addTodo({ userId: nanoid(), title: newTodo, completed: false });
    setNewTodo('');
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {isLoading && Loading.hourglass('Loading...')}
      {isSuccess &&
        !isError &&
        (Loading.remove(1500),
        data.length === 0 ? (
          <section className="section">
            <div className="container">
              <p
                className="text-center"
                style={{ marginTop: '50px', color: 'red' }}
              >
                List is empty
              </p>
            </div>
          </section>
        ) : (
          data.map(todo => (
            <article key={todo.id} style={{ marginTop: '10px' }}>
              <div className="todo">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  id={todo.id}
                  onChange={() =>
                    updateTodo({ ...todo, completed: !todo.completed })
                  }
                />
                <label htmlFor={todo.id}>{todo.title}</label>
              </div>
              <button className="trash" onClick={() => deleteTodo(todo.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </article>
          ))
        ))}

      {isError && Report.warning(`${error.error}`, '') && Loading.remove()}
    </main>
  );
};
export default TodoList;
