import { useRef, useState } from 'react';
import './TodoItem.scss';

function TodoItem({ item, deleteItem, idx, updatedItem }) {
  const [todoEdit, setTodoEdit] = useState(false);
  const createdAt = new Date().toLocaleString();
  const inputRef = useRef();

  const editItem = () => {
    setTodoEdit(!todoEdit);
  };

  const SavedTodoList = () => {
    return (
      <div>
        <li>{item}</li>
        <button onClick={() => deleteItem(idx)}>Delete</button>
        <button onClick={() => editItem(idx)}>Edit</button>
        <p>Created at : {createdAt}</p>
      </div>
    );
  };

  return (
    <div className="todoItem">
      {todoEdit ? (
        <div>
          <input defaultValue={item} ref={inputRef} />
          <button onClick={() => updatedItem(idx, inputRef, setTodoEdit)}>
            Save
          </button>
        </div>
      ) : (
        <SavedTodoList />
      )}
    </div>
  );
}

export default TodoItem;
