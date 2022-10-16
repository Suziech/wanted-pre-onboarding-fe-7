import TodoItem from './TodoItem';

function TodoBoard({
  todo,
  id,
  isCompleted,
  createdAt,
  deleteItem,
  updatedItem,
  inputContext,
  done,
}) {
  return (
    <form className="todoItem">
      <TodoItem
        todo={todo}
        createdAt={createdAt}
        deleteItem={deleteItem}
        id={id}
        updatedItem={updatedItem}
        inputContext={inputContext}
        isCompleted={isCompleted}
        done={done}
      />
    </form>
  );
}

export default TodoBoard;
