import { createBrowserRouter } from 'react-router-dom';
import AddClassPage from 'pages/AddClassPage';
import AddResultPage from 'pages/AddResultPage';
import LectureDetailPage from 'pages/LectureDetailPage';
import LectureRegisterPage from 'pages/LectureRegisterPage';
import LoginPage from 'pages/LoginPage';
import MainPage from 'pages/MainPage';
import OAuthPage from 'pages/OAuthPage';
import OnboardingPage from 'pages/OnboardingPage';
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
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'onboarding',
          element: <OnboardingPage />,
        },
        {
          path: 'auth/kakao/callback',
          element: <OAuthPage />,
        },
        {
          path: ':id/:lectureId',
          element: <LectureDetailPage />,
        },
        {
          path: ':id/:lectureId/register',
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
        {
          path: ':id/add-class',
          element: <AddClassPage />,
        },
        {
          path: ':id/add-class/result',
          element: <AddResultPage />,
        },
      ],
    },
  ]);
};
