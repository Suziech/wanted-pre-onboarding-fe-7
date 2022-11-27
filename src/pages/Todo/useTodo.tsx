import React, { useState, useEffect } from 'react';
import { todoFetch } from '../../Api/Todo';

// 리액트에서 타입스크립트 사용법
// 1. 일단 추론 하게 하고.
// 2. 통신데이터 뭉텅이로오는 배열 안에 객체 => 객체에대한 타입을 만들어야함
// 3. 만약에 타입이 진짜 안만들어지면 방금처럼 타입을 억지로 만든다

export interface TypeTodoInfo {
  id: string;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
export type TypeTodoInfos = TypeTodoInfo[];

export default function useTodo() {
  const [addTodo, setAddTodo] = useState('');
  const [todoInfo, setTodoInfo] = useState<TypeTodoInfos>([]);
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
    addTodo,
    FetchTodo,
    todoInfo,
    createdAt,
    deleteItem,
    updatedItem,
    inputContext,
    done,
    todoInput,
  };
}
