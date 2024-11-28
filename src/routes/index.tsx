import { createBrowserRouter } from 'react-router-dom';
import PointPage from 'pages/PointPage';
import PurchaseHistoryPage from 'pages/PurchaseHistoryPage';
import PurchasePage from 'pages/PurchasePage';
import Test from 'pages/Test';

export const createRouter = () => {
  return createBrowserRouter([
    {
      path: '/',
      children: [
        {
          path: 'test',
          element: <Test />,
        },
        {
          path: ':id/point',
          element: <PointPage />,
        },
        {
          path: ':id/point/purchase',
          element: <PurchasePage />,
        },
        {
          path: ':id/point/purchase/history',
          element: <PurchaseHistoryPage />,
        },
      ],
    },
  ]);
};
