import './TodoItem.scss';

function TodoItem({ item }) {
  const createdAt = new Date().toLocaleString();
  return (
    <div className="todoItem">
      {item}
      <button>Delete</button>
      <button>Edit</button>
      <p>Created at : {createdAt}</p>
    </div>
  );
}

export default TodoItem;
