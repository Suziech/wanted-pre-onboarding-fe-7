import React from 'react';
import TodoItem from './TodoItem';

function TodoBoard({ todoList }) {
  return (
    <div>
      <h1>Todo List</h1>
      {todoList.map((item, idx) => (
        <TodoItem key={idx} item={item} />
      ))}
    </div>
  );
}

export default TodoBoard;
