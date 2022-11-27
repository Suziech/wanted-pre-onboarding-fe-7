import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Todo from './pages/Todo/Todo';

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

// ts / tsx
// 타입을 깔았기 때문에 react 도 명시를 해달라는 것
// 타입스크립트가 의도치 않은 일을 발생시키지 않게 하기 위함
// 번들링 과정에서도
// tsx는 컴포넌트라 따로 번들링 해줘야 함
