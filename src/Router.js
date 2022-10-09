import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Todo from './pages/Todo';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
