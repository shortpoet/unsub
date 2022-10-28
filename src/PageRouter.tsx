import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './page/Home';
import { LoginPage } from './page/LoginPage';
import { MessagesPage } from './page/MessagesPage';
import { TablesPage } from './page/TablesPage';

export function PageRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/tables" element={<TablesPage />} />
    </Routes>
  );
}
