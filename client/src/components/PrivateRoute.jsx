import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verify__Request__API } from '../api/Api';
const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    verify__Request__API().then((result) => {
      if (result === true) {
        navigate('/');
      } else {
        navigate('/login');
      }
    });
  }, []);

  return <>{children}</>;
};

export default PrivateRoute;
