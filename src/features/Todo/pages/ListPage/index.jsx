import TodoForm from 'features/Todo/components/TodoForm';
import TodoList from 'features/Todo/components/TodoList';
import queryString from 'query-string';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { useSearchParams } from 'react-router-dom';

const initTodoList = [
  { id: 1, title: 'Eat', status: 'completed' },
  { id: 2, title: 'Code', status: 'completed' },
  { id: 3, title: 'Sleep', status: 'new' },
  { id: 4, title: 'Enjoy', status: 'new' },
];

function ListPage(props) {
  const location = useLocation();
  const [todoList, setTodoList] = useState(initTodoList);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredState, setFilteredState] = useState(() => searchParams.get('status') || 'all');

  useEffect(() => {
    const params = queryString.parse(location.search);
    setFilteredState(params.status || 'all');
  }, [location.search]);

  function handleShowAll() {
    setFilteredState('all');
    const queryParams = { status: 'all' };
    setSearchParams(queryParams);
  }

  function handleShowNew() {
    setFilteredState('new');
    const queryParams = { status: 'new' };
    setSearchParams(queryParams);
  }

  function handleOnCompleted() {
    setFilteredState('completed');
    const queryParams = { status: 'completed' };
    setSearchParams(queryParams);
  }

  function handleOnTodoClick(todo, idx) {
    const newTodoList = [...todoList];

    newTodoList[idx] = {
      ...newTodoList[idx],
      status: todo.status === 'completed' ? 'new' : 'completed',
    };

    setTodoList(newTodoList);
  }

  const renderedTodoList = useMemo(() => {
    return todoList.filter((todo) => filteredState === 'all' || filteredState === todo.status);
  }, [todoList, filteredState]);

  function handleTodoFormSubmit(value) {
    const newTodo = {
      id: todoList.length + 1,
      title: value.title,
      status: 'new',
    };

    const newTodoList = [...todoList, newTodo];

    setTodoList(newTodoList);
  }

  return (
    <>
      <h2>What to do</h2>
      <TodoForm onSubmit={handleTodoFormSubmit} />

      <TodoList todoList={renderedTodoList} onTodoClick={handleOnTodoClick} />
      <button onClick={handleShowAll}>Show All</button>
      <button onClick={handleShowNew}>Show New</button>
      <button onClick={handleOnCompleted}>Show Completed</button>
    </>
  );
}

export default ListPage;
