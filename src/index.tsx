import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Users from './components/Users';
import Profile from './components/Profile';
import { Provider } from "react-redux";
import store from './store';
import ProtectedRoutes from './components/ProtectedRoute/ProtectedRoute';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedRoutes/>}>
                        <Route path='/home' element={<Users/>} />
                        <Route path='/profile' element={<Profile/>} />
                    </Route>
                    <Route path='/' element={<Login />} />
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
