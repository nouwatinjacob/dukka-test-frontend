import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Main as MainLayout } from 'components/layouts';
import Dashboard from 'pages/Dashboard';
import Home from 'pages/Home';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';
import SignUp from 'pages/SignUp';
import ErrorHandler from './ErrorHandler';
import PrivateRoute from '../components/PrivateRoute';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorHandler>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              // @ts-ignore: type issue
              element={<PrivateRoute component={Dashboard} />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorHandler>
    </BrowserRouter>
  );
};

export default App;
