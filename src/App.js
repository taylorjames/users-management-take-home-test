import React from 'react';
import { hot } from 'react-hot-loader/root';
import UserManagement from './components/UserManagement';

const App = () => {
  return (
    <>
      <header>
        <h1>User Management</h1>
      </header>
      <UserManagement />
      <footer>
        <p>© 2023 Example Company</p>
      </footer>
    </>
  );
};

export default hot(App);
