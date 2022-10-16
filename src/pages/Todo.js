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

  const deleteItem = idx => {
    setTodoList(todoList.filter((_, itemIdx) => idx !== itemIdx));
  };

  const updatedItem = (idx, inputRef, setTodoEdit) => {
    todoList[idx] = inputRef.current.value;
    setTodoList(prev => [...prev]);
    setTodoEdit(prev => !prev);
  };

  return (
    <div>
      <div className="todo">
        <div className="todoWrapper">
          <h1>Good day! What are your tasks today?</h1>
          <form>
            <input type="text" value={addTodo} onChange={todoInput} />
            <button onClick={addItem}>Add</button>
          </form>
          <TodoBoard
            todoList={todoList}
            deleteItem={deleteItem}
            updatedItem={updatedItem}
          />
        </div>
      </div>
    </div>
  );
}

export default Todo;
