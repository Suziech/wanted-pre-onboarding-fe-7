const baseUrl = 'https://pre-onboarding-selection-task.shop/todos';
const headers = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
};

export const todoFetch = {
  GET: setTodoInfo => {
    fetch(baseUrl, {
      method: 'GET',
      headers,
    })
      .then(response => response.json())
      .then(data => setTodoInfo(data));
  },
  POST: (setTodoInfo, todo) => {
    fetch(baseUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ todo }),
    })
      .then(response => response.json())
      .then(result => setTodoInfo(prev => [...prev, result]));
  },
  PUT: (id, todo, isCompleted) => {
    fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        todo,
        isCompleted,
      }),
    });
  },
  DELETE: id => {
    fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
      headers,
    });
  },
};
