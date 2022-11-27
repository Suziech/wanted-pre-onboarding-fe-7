import React, { useEffect, useState } from 'react';
import { todoFetch } from '../Api/Todo';

export interface itemProps {
  id: string;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

const useTodo = () => {
  const [addTodo, setAddTodo] = useState('');
  const [todoInfo, setTodoInfo] = useState<itemProps[]>([]);
  // 이때 왜 useState 안에서 초기값으로 타입을 정해주지 않은 건지? 원래 값이 없는 애니까... 얘는 데이터 받는 애
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

  const FetchTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    todoFetch.POST(setTodoInfo, addTodo);
    setAddTodo('');
  };
  useEffect(() => {
    todoFetch.GET(setTodoInfo);
  }, []);

  return {
    addTodo,
    todoInput,
    FetchTodo,
    todoInfo,
    createdAt,
    deleteItem,
    updatedItem,
    inputContext,
    done,
  };
};

export default useTodo;
