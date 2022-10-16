import React from 'react';
import TodoItem from './TodoItem';

function TodoBoard({ todoList, deleteItem, updatedItem }) {
  return (
    <div>
      <h1>Todo List</h1>
      {todoList.map((item, idx) => (
        <TodoItem
          key={idx}
          item={item}
          idx={idx}
          deleteItem={deleteItem}
          updatedItem={updatedItem}
        />
      ))}
    </div>
  );
}

export default TodoBoard;
