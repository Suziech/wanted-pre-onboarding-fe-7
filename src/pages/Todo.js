import React, { useEffect, useState } from 'react';
import TodoBoard from '../components/TodoBoard';
import { todoFetch } from '../api/todo';

function Todo() {
  const [addTodo, setAddTodo] = useState('');
  const [todoInfo, setTodoInfo] = useState([]);
  const createdAt = new Date().toLocaleString();

  const done = id => {
    setTodoInfo(prev =>
      prev.map(item => {
        if (item.id === id) {
          item.isCompleted = !item.isCompleted;
        }
        return item;
      })
    );
  };
  const todoInput = e => {
    setAddTodo(e.target.value);
  };

  const deleteItem = (id, e) => {
    e.preventDefault();
    todoFetch.DELETE(id);
    setTodoInfo(prev => prev.filter(item => id !== item.id));
  };

  const inputContext = (selectId, inputRef) => {
    setTodoInfo(prev =>
      prev.map(item => {
        if (item.id === selectId) {
          item.todo = inputRef.current.value;
        }
        return item;
      })
    );
  };

  const updatedItem = (e, id, setUpdateItem, todo, isCompleted) => {
    e.preventDefault();
    todoFetch.PUT(id, todo, isCompleted);

    setUpdateItem(prev => !prev);
  };

  const FetchTodo = e => {
    e.preventDefault();
    todoFetch.POST(setTodoInfo, addTodo);
    setAddTodo('');
  };

  useEffect(() => {
    todoFetch.GET(setTodoInfo);
  }, []);

  return (
    <div>
      <div className="todo">
        <div className="todoWrapper">
          <h1>Good day! What are your tasks today?</h1>
          <form>
            <input type="text" value={addTodo} onChange={todoInput} />
            <button onClick={FetchTodo}>Add</button>
          </form>
          {todoInfo.length !== 0 && <h1>Todo List</h1>}
          {todoInfo?.map(item => (
            <TodoBoard
              todo={item.todo}
              key={item.id}
              id={item.id}
              isCompleted={item.isCompleted}
              createdAt={createdAt}
              deleteItem={deleteItem}
              updatedItem={updatedItem}
              inputContext={inputContext}
              done={done}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Todo;
