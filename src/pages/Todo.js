import React, { useState } from 'react';
import TodoBoard from '../components/TodoBoard';

function Todo() {
  const [addTodo, setAddTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const todoInput = e => {
    setAddTodo(e.target.value);
  };
  const addItem = e => {
    e.preventDefault();
    setTodoList([...todoList, addTodo]);
    setAddTodo('');
  };

  return (
    <div>
      <div className="todo">
        <div className="todoWrapper">
          <h1>Good day! Write your to-do list here</h1>
          <form>
            <input type="text" onChange={todoInput} value={addTodo} />
            <button onClick={addItem}>Add</button>
          </form>
          <TodoBoard todoList={todoList} />
        </div>
      </div>
    </div>
  );
}

export default Todo;
