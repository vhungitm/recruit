import { HubConnectionBuilder } from '@microsoft/signalr';
import { getToken } from 'API/axiosClient';
import { refreshToken, selectCurrentUser } from 'app/authSlice';
import dayjs from 'dayjs';
import CONFIG from 'Environment/appsetting';
import jwtDecode from 'jwt-decode';
import AuthLayout from 'Layout/AuthLayout';
import DefaultLayout from 'Layout/DefaultLayout';
import { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from 'routes';
import 'SCSS/style.scss';
import 'SCSS/_index.scss';
import 'SCSS/_formCheck.scss';
import './App.css';

const App = () => {
  const currentUser = useSelector(selectCurrentUser);

  // SignalR
  const [connection, setConnection] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const listenConnection = async () => {
      if (currentUser) {
        const apiLink = `${CONFIG.API_URL}/hubs/notifications`;
        const config = {
          accessTokenFactory: async () => await getToken()
        };

        const newConnection = new HubConnectionBuilder()
          .withUrl(apiLink, config)
          .withAutomaticReconnect()
          .build();

        await newConnection.start();

        setConnection(newConnection);
      }
    };

    listenConnection();
  }, [currentUser]);

  // Refresh token
  useEffect(() => {
    const autoRefreshToken = () => {
      const token = JSON.parse(sessionStorage.getItem('token'));
      let { exp } = jwtDecode(token);
      const refreshTokenTime = dayjs.unix(exp).diff(dayjs());

      setTimeout(async () => {
        dispatch(refreshToken());
      }, refreshTokenTime);
    };

    if (currentUser) autoRefreshToken();
  }, [currentUser, dispatch]);

  // Loading JSX
  const loadingJSX = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse">đang tải</div>
    </div>
  );

  // Return
  return (
    <BrowserRouter>
      <Suspense fallback={loadingJSX}>
        <Routes>
          {routes.map(item => (
            <Route
              key={item.path}
              exact={item.exact}
              path={item.path}
              name={item.name}
              element={
                item.layout === 'auth' ? (
                  <AuthLayout element={<item.element />} />
                ) : item.layout === 'default' ? (
                  <DefaultLayout
                    connection={connection}
                    element={<item.element connection={connection} />}
                  />
                ) : (
                  <item.element />
                )
              }
            />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
