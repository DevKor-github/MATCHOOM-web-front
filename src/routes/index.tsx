import { createBrowserRouter } from 'react-router-dom';
import MainPage from 'pages/MainPage';
import PointPage from 'pages/PointPage';
import PurchaseHistoryPage from 'pages/PurchaseHistoryPage';
import PurchasePage from 'pages/PurchasePage';

export const createRouter = () => {
  return createBrowserRouter([
    {
      path: '/',
      children: [
        {
          path: ':id',
          element: <MainPage />,
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
