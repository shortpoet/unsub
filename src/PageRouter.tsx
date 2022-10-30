import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './page/HomePage';
import { LoginPage } from './page/LoginPage';
import { MessagesPage } from './page/MessagesPage';
import { TablesPage } from './page/TablesPage';

export function PageRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/tables" element={<TablesPage />} />
    </Routes>
  );
}
