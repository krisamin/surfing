import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import '@styles/style.scss';

import Root from '@routes/root';
import Index from '@routes/index';
import Circle from '@routes/circle';
import Login from '@routes/login';
import Detail from '@routes/detail';
import Admin from '@routes/admin';

import store from '@redux/store';
import { Provider } from 'react-redux';
import { AxiosProvider } from '@provider/axios';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Index />,
      },
      {
        path: '/circle',
        element: <Circle />,
      },
      {
        path: '/circle/:id',
        element: <Detail />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/admin',
        element: <Admin />,
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <Provider store={store}>
      <AxiosProvider>
        <RouterProvider router={ router } />
      </AxiosProvider>
    </Provider>
  //</React.StrictMode>
);
