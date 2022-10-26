import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './page/Home';
import { MessageList } from './component/message/MessageList';
import { LoginPage } from './page/LoginPage';
import { MessagesPage } from './page/MessagesPage';

export function PageRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
