import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

function TodoFeature(props) {
  return (
    <>
      <Routes>
        <Route index element={<ListPage />} />
        <Route path=":todoId" element={<DetailPage />} />
      </Routes>
    </>
  );
}

export default TodoFeature;
