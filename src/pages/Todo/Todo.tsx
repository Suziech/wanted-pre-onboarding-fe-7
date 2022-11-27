import TodoItem from './TodoItem/TodoItem';
import useTodo from './TodoItem/Todo.hook';

function Todo() {
  const {
    todoInfo,
    createdAt,
    done,
    todoInput,
    deleteItem,
    inputContext,
    updatedItem,
    FetchTodo,
    addTodo,
  } = useTodo();

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
          {todoInfo.map(item => (
            <TodoItem
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
