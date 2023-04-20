import React from 'react';
import PropTypes from 'prop-types';
import UsersTableBase from './UsersTableBase';

const UsersTable = ({ users, isLoading, onAddUser, onEditUser }) => {
  return (
    <section>
      <header>
        <h2>All Users</h2>
        <button className="add-user-button" type="button" onClick={onAddUser}>
          Add User +
        </button>
      </header>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <UsersTableBase users={users} onEditUser={onEditUser} />
      )}
    </section>
  );
};

UsersTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onEditUser: PropTypes.func.isRequired,
  onAddUser: PropTypes.func.isRequired,
};

export default UsersTable;
