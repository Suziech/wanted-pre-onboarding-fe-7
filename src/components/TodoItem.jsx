import { useState, useRef } from 'react';
import './TodoItem.scss';
function TodoItem({
  todo,
  createdAt,
  deleteItem,
  id,
  updatedItem,
  inputContext,
  isCompleted,
  done,
}) {
  const [updateItem, setUpdateItem] = useState(false);
  const inputRef = useRef();

  return (
    <div>
      <input
        type="checkbox"
        onClick={() => done(id)}
        checked={isCompleted}
        readOnly
      />
      {updateItem ? (
        <input
          defaultValue={todo}
          ref={inputRef}
          onChange={() => inputContext(id, inputRef)}
        />
      ) : (
        <p>{todo}</p>
      )}

      <button onClick={e => deleteItem(id, e)}>Delete</button>
      {updateItem ? (
        <button
          onClick={e => updatedItem(e, id, setUpdateItem, todo, isCompleted)}
        >
          완료
        </button>
      ) : (
        <button
          onClick={e => {
            e.preventDefault();
            setUpdateItem(true);
          }}
        >
          Edit
        </button>
      )}
      <p>{createdAt}</p>
    </div>
  );
}

export default TodoItem;
