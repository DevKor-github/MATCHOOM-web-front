import { createBrowserRouter } from 'react-router-dom';
import LectureDetailPage from 'pages/LectureDetailPage';
import LectureRegisterPage from 'pages/LectureRegisterPage';
import PointPage from 'pages/PointPage';
import PurchaseHistoryPage from 'pages/PurchaseHistoryPage';
import PurchasePage from 'pages/PurchasePage';

export const createRouter = () => {
  return createBrowserRouter([
    {
      path: '/',
      children: [
        {
          path: 'id/class',
          element: <LectureDetailPage />,
        },
        {
          path: 'id/class/register',
          element: <LectureRegisterPage />,
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
