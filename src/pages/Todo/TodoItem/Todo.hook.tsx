import React, { useEffect, useState } from 'react';
import { todoFetch } from '../../../Api/Todo';

interface TypeTodoInfo {
  id: string;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export default function useTodo() {
  const [addTodo, setAddTodo] = useState('');
  const [todoInfo, setTodoInfo] = useState<TypeTodoInfo[]>([]);
  const createdAt = new Date().toLocaleString();

  const done = (id: string) => {
    setTodoInfo(prev =>
      prev.map(item => {
        if (item.id === id) {
          item.isCompleted = !item.isCompleted;
        }
        return item;
      })
    );
  };
  const todoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddTodo(e.target.value);
  };

  const deleteItem = (id: string, e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    todoFetch.DELETE(id);
    setTodoInfo(prev => prev.filter(item => id !== item.id));
  };

  const inputContext = (
    selectId: string,
    inputRef: { current: { value: string } }
  ) => {
    setTodoInfo(prev =>
      prev.map(item => {
        if (item.id === selectId) {
          item.todo = inputRef.current.value;
        }
        return item;
      })
    );
  };

  const updatedItem = (
    e: React.FormEvent<HTMLButtonElement>,
    id: string,
    setUpdateItem: React.Dispatch<React.SetStateAction<boolean>>,
    todo: string,
    isCompleted: boolean
  ) => {
    e.preventDefault();
    todoFetch.PUT(id, todo, isCompleted);
    setUpdateItem(prev => !prev);
  };

  const FetchTodo = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    todoFetch.POST(setTodoInfo, addTodo);
    setAddTodo('');
  };
  useEffect(() => {
    todoFetch.GET(setTodoInfo);
  }, []);

  return {
    todoInfo,
    createdAt,
    done,
    todoInput,
    deleteItem,
    inputContext,
    updatedItem,
    FetchTodo,
    addTodo,
  };
}
