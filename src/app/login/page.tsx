'use client';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useSelector, useDispatch } from 'react-redux';

import { changeBox, logout } from '../../redux/slice/boxSlicer';
import { RootState } from '../../redux/store';

const index = () => {
  const dispatch = useDispatch();
  const { name, isLogged } = useSelector((state: RootState) => state.box);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    dispatch(changeBox('ganço'));
  };

  const handleDes = () => {
    dispatch(changeBox('ganço'));
  };

  const handlees = () => {
    dispatch(changeBox('ganço'));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>{name}</h1>
      <div>
        <div>
          {!isLogged ? (
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={handleLogin}
            >
              Login
            </button>
          ) : (
            <button
              className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
              onClick={handleLogout}
            >
              Logoutss
            </button>
          )}
        </div>
        <button
          className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
          onClick={handlees}
        >
          es
        </button>
        <button
          className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
          onClick={handleDes}
        >
          Logoutss
        </button>
      </div>
    </div>
  );
};

export default index;
