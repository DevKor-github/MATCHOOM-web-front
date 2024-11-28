import { createBrowserRouter } from 'react-router-dom';
import PointPage from 'pages/PointPage';
import Test from 'pages/Test';

export const createRouter = () => {
  return createBrowserRouter([
    {
      path: '/test',
      element: <Test />,
    },
    {
      path: '/:id/point',
      element: <PointPage />,
    },
  ]);
};
